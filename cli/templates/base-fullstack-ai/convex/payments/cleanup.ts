import { internalAction } from "../_generated/server";
import { components } from "../_generated/api";

export const cleanupDuplicateProducts = internalAction({
  handler: async (ctx) => {
    const allProducts = await ctx.runQuery(components.polar.lib.listProducts, {
      includeArchived: true,
    });

    const productsByExternalId = new Map<string, typeof allProducts>();
    for (const product of allProducts) {
      const externalId = product.id;
      if (!productsByExternalId.has(externalId)) {
        productsByExternalId.set(externalId, []);
      }
      productsByExternalId.get(externalId)!.push(product);
    }

    let archivedCount = 0;

    for (const [externalId, duplicates] of productsByExternalId) {
      if (duplicates.length > 1) {
        console.log(
          `Found ${duplicates.length} duplicates for product ${externalId}`
        );

        for (let i = 1; i < duplicates.length; i++) {
          try {
            await ctx.runMutation(components.polar.lib.updateProduct, {
              product: {
                ...duplicates[i],
                isArchived: true,
              },
            });
            archivedCount++;
          } catch (error) {
            console.error(`Failed to archive duplicate product:`, error);
          }
        }
      }
    }

    console.log(`Archived ${archivedCount} duplicate products`);
    return { deletedCount: archivedCount };
  },
});
