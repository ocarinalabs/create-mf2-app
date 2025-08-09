import { Polar } from "@convex-dev/polar";
import { api, components, internal } from "../_generated/api";
import { action, internalAction } from "../_generated/server";
import { Polar as PolarSdk } from "@polar-sh/sdk";
import { type Product } from "@polar-sh/sdk/models/components/product";

export const polar = new Polar(components.polar, {
  // Required: provide a function the component can use to get the current user's ID and
  // email - this will be used for retrieving the correct subscription data for the
  // current user. The function should return an object with `userId` and `email`
  // properties.
  getUserInfo: async (ctx): Promise<{ userId: string; email: string }> => {
    const user = await ctx.runQuery(api.auth.users.currentUser);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      userId: user._id,
      email: user.clerkUser.email_addresses?.[0]?.email_address || "",
    };
  },
  // Optional: Configure static keys for referencing your products.
  // These use environment variables that should be set in your deployment
  products: {
    starter: process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID || "",
    pro: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID || "",
  },
});

// Export API functions from the Polar client
export const {
  changeCurrentSubscription,
  cancelCurrentSubscription,
  getConfiguredProducts,
  listAllProducts,
  generateCheckoutLink,
  generateCustomerPortalUrl,
} = polar.api();

// Internal action that does the actual sync work
export const _syncPolarProducts = internalAction({
  handler: async (
    ctx
  ): Promise<{
    created: number;
    archived: number;
    synced: number;
    skipped: number;
    polarArchivedCount?: number;
  }> => {
    // First clean up any duplicates
    await ctx.runAction(internal.payments.cleanup.cleanupDuplicateProducts);

    const stats = {
      created: 0,
      archived: 0,
      synced: 0,
      skipped: 0,
      polarArchivedCount: 0,
    };

    const polarSdk = new PolarSdk({
      accessToken: process.env.POLAR_ORGANIZATION_TOKEN!,
      server:
        (process.env.POLAR_SERVER as "sandbox" | "production") || "production",
    });

    // First, get count of archived products in Polar
    const archivedPages = await polarSdk.products.list({ isArchived: true });
    for await (const page of archivedPages) {
      if (page.result.items) {
        stats.polarArchivedCount += page.result.items.length;
      }
    }

    // Fetch all active products from Polar
    const polarProducts: Product[] = [];
    const pages = await polarSdk.products.list({ isArchived: false });
    for await (const page of pages) {
      if (page.result.items) {
        polarProducts.push(...page.result.items);
      }
    }

    // Get existing Convex products
    const convexProducts = await ctx.runQuery(
      components.polar.lib.listProducts,
      {
        includeArchived: false,
      }
    );

    // Archive products that aren't in Polar anymore
    for (const convexProduct of convexProducts) {
      if (!polarProducts.some((p) => p.id === convexProduct.id)) {
        await ctx.runMutation(components.polar.lib.updateProduct, {
          product: {
            ...convexProduct,
            isArchived: true,
          },
        });
        stats.archived++;
      }
    }

    // Upsert Polar products, filtering out incompatible ones
    for (const polarProduct of polarProducts) {
      // Skip non-recurring products (one-time payments)
      if (!polarProduct.isRecurring) {
        console.log(`Skipping non-recurring product: ${polarProduct.name}`);
        stats.skipped++;
        continue;
      }

      // Filter out prices with custom pricing
      const validPrices = polarProduct.prices.filter(
        (price: any) => price.amountType !== "custom" && !price.isArchived
      );

      // Skip if no valid prices
      if (validPrices.length === 0) {
        console.log(
          `Skipping product with only custom pricing: ${polarProduct.name}`
        );
        stats.skipped++;
        continue;
      }

      // Convert to database format
      const product = {
        id: polarProduct.id,
        name: polarProduct.name,
        description: polarProduct.description,
        createdAt: polarProduct.createdAt.toISOString(),
        modifiedAt: polarProduct.modifiedAt?.toISOString() ?? null,
        isArchived: polarProduct.isArchived,
        isRecurring: polarProduct.isRecurring,
        organizationId: polarProduct.organizationId,
        metadata: polarProduct.metadata,
        recurringInterval: polarProduct.recurringInterval,
        medias: polarProduct.medias.map((media) => ({
          ...media,
          createdAt: media.createdAt.toISOString(),
          lastModifiedAt: media.lastModifiedAt?.toISOString() ?? null,
        })),
        prices: validPrices.map((price: any) => ({
          id: price.id,
          productId: price.productId,
          amountType: price.amountType,
          isArchived: price.isArchived,
          createdAt: price.createdAt.toISOString(),
          modifiedAt: price.modifiedAt?.toISOString() ?? null,
          recurringInterval:
            price.type === "recurring"
              ? (price.recurringInterval ?? undefined)
              : undefined,
          priceAmount: price.priceAmount,
          priceCurrency: price.priceCurrency,
          type: price.type,
        })),
      };

      const existingConvexProduct = convexProducts.find(
        (p) => p.id === polarProduct.id
      );
      try {
        if (existingConvexProduct) {
          await ctx.runMutation(components.polar.lib.updateProduct, {
            product,
          });
          stats.synced++;
        } else {
          await ctx.runMutation(components.polar.lib.createProduct, {
            product,
          });
          stats.created++;
        }
      } catch (error) {
        console.error(`Failed to sync product ${polarProduct.name}:`, error);
        // If it's a duplicate error, try to update instead
        if (error instanceof Error && error.message.includes("unique()")) {
          try {
            await ctx.runMutation(components.polar.lib.updateProduct, {
              product,
            });
            stats.synced++;
          } catch (updateError) {
            console.error(
              `Failed to update product ${polarProduct.name} after duplicate error:`,
              updateError
            );
          }
        }
      }
    }

    const statsString = Object.entries(stats)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    console.log(`Polar products sync - ${statsString}`);

    if (stats.polarArchivedCount > 0) {
      console.log(
        `Note: ${stats.polarArchivedCount} archived products in Polar were not synced`
      );
    }

    return stats;
  },
});

// Public action to sync products from Polar (callable from dashboard/UI)
export const syncProducts = action({
  args: {},
  handler: async (
    ctx
  ): Promise<{
    success: boolean;
    compatibleProductCount: number;
    skippedProductCount: number;
    archivedProductCount: number;
    polarArchivedCount: number;
  }> => {
    if (!process.env.POLAR_ORGANIZATION_TOKEN) {
      throw new Error("POLAR_ORGANIZATION_TOKEN not set");
    }

    const stats = await ctx.runAction(
      internal.payments.polar._syncPolarProducts
    );

    return {
      success: true,
      compatibleProductCount: stats.created + stats.synced,
      skippedProductCount: stats.skipped,
      archivedProductCount: stats.archived,
      polarArchivedCount: stats.polarArchivedCount || 0,
    };
  },
});

// Action to clear all products by archiving them (useful for testing)
export const clearAllProducts = action({
  args: {},
  handler: async (
    ctx
  ): Promise<{ archivedCount: number; cleanedDuplicates: number }> => {
    // First clean up any duplicates
    const cleanupResult = await ctx.runAction(
      internal.payments.cleanup.cleanupDuplicateProducts
    );

    // Then archive remaining products
    const products = await ctx.runQuery(components.polar.lib.listProducts, {
      includeArchived: false,
    });

    let archivedCount = 0;
    for (const product of products) {
      try {
        await ctx.runMutation(components.polar.lib.updateProduct, {
          product: {
            ...product,
            isArchived: true,
          },
        });
        archivedCount++;
      } catch (error) {
        console.error(`Failed to archive product ${product.id}:`, error);
      }
    }

    return {
      archivedCount,
      cleanedDuplicates: cleanupResult.deletedCount,
    };
  },
});
