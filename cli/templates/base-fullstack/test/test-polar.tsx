"use client";

import { useState } from "react";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
  useAction,
} from "convex/react";
import { SignInButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckoutLink, CustomerPortalLink } from "@convex-dev/polar/react";
import { Badge } from "@/components/ui/badge";

export default function TestPolarPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Polar Integration Test
      </h1>

      <Unauthenticated>
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to test Polar integration
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SignInButton mode="modal">
              <Button size="lg">Sign In to Continue</Button>
            </SignInButton>
          </CardContent>
        </Card>
      </Unauthenticated>

      <Authenticated>
        <PolarTestContent />
      </Authenticated>
    </div>
  );
}

function PolarTestContent() {
  const [loading, setLoading] = useState(false);

  // Test queries
  const configuredProducts = useQuery(api.payments.polar.getConfiguredProducts);
  const allProducts = useQuery(api.payments.polar.listAllProducts);

  // Test actions
  const generateCheckoutLink = useAction(api.payments.polar.generateCheckoutLink);
  const generatePortalUrl = useAction(api.payments.polar.generateCustomerPortalUrl);
  const syncProducts = useAction(api.payments.polar.syncProducts);
  const clearAllProducts = useAction(api.payments.polar.clearAllProducts);

  const handleGenerateCheckoutLink = async (productId: string) => {
    setLoading(true);
    try {
      const url = await generateCheckoutLink({
        productIds: [productId],
        successUrl: window.location.origin + "/checkout/success",
      });
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating checkout link:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePortalUrl = async () => {
    setLoading(true);
    try {
      const url = await generatePortalUrl();
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating portal URL:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncProducts = async () => {
    setLoading(true);
    try {
      const result = await syncProducts();
      let message = `Products synced successfully!\n\nCompatible products: ${result.compatibleProductCount}\nSkipped products: ${result.skippedProductCount}`;
      if (result.archivedProductCount > 0) {
        message += `\nArchived in Convex: ${result.archivedProductCount}`;
      }
      if (result.polarArchivedCount > 0) {
        message += `\n\nNote: ${result.polarArchivedCount} archived products in Polar were not synced`;
      }
      alert(message);
    } catch (error) {
      console.error("Error syncing products:", error);
      alert("Error syncing products. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearProducts = async () => {
    if (
      !confirm(
        "Are you sure you want to archive all products? This will hide them from view but they can be recovered."
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const result = await clearAllProducts();
      let message = `Archived ${result.archivedCount} products successfully!`;
      if (result.cleanedDuplicates > 0) {
        message += `\nAlso cleaned up ${result.cleanedDuplicates} duplicate products.`;
      }
      alert(message);
    } catch (error) {
      console.error("Error clearing products:", error);
      alert("Error clearing products. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (process.env.NEXT_PUBLIC_POLAR_ENABLED !== "true") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Polar is Disabled</CardTitle>
          <CardDescription>
            Set NEXT_PUBLIC_POLAR_ENABLED=true in your .env.local
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Environment Check */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Status</CardTitle>
          <CardDescription>Polar configuration check</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Polar Enabled:</span>
            <Badge variant="default">✓ Enabled</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Starter Product ID:</span>
            <Badge
              variant={
                process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID
                  ? "default"
                  : "destructive"
              }
            >
              {process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID
                ? "✓ Set"
                : "✗ Not Set"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Pro Product ID:</span>
            <Badge
              variant={
                process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID
                  ? "default"
                  : "destructive"
              }
            >
              {process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID
                ? "✓ Set"
                : "✗ Not Set"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Configured Products */}
      <Card>
        <CardHeader>
          <CardTitle>Configured Products</CardTitle>
          <CardDescription>
            Products configured in convex/polar.ts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {configuredProducts === undefined ? (
            <Skeleton className="h-20 w-full" />
          ) : configuredProducts === null ? (
            <p className="text-sm text-muted-foreground">
              No configured products found
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(configuredProducts).map(([key, product]) => (
                <div key={key} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{key}</p>
                      <p className="text-sm text-muted-foreground">
                        {(product as any).name} -{" "}
                        {(product as any).prices?.[0]?.priceAmount
                          ? `$${((product as any).prices[0].priceAmount / 100).toFixed(2)}`
                          : "No price"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleGenerateCheckoutLink((product as any).id)}
                      disabled={loading}
                    >
                      Test Checkout
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Products */}
      <Card>
        <CardHeader>
          <CardTitle>All Products from Polar</CardTitle>
          <CardDescription>
            All products synced from your Polar account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {allProducts === undefined ? (
            <Skeleton className="h-20 w-full" />
          ) : allProducts === null || allProducts.length === 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No products found. Make sure to create products in Polar and
                sync them.
              </p>
              <Button onClick={handleSyncProducts} disabled={loading}>
                Sync Products from Polar
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {allProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {product.id}
                      </p>
                      <p className="text-sm">
                        {product.prices[0]?.priceAmount
                          ? `$${(product.prices[0].priceAmount / 100).toFixed(2)} / ${product.prices[0].recurringInterval}`
                          : "No price"}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateCheckoutLink((product as any).id)}
                        disabled={loading}
                      >
                        Direct Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSyncProducts} disabled={loading}>
                  Sync Products from Polar
                </Button>
                <Button
                  onClick={handleClearProducts}
                  disabled={loading}
                  variant="destructive"
                >
                  Archive All Products
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Components */}
      <Card>
        <CardHeader>
          <CardTitle>React Components Test</CardTitle>
          <CardDescription>
            Test the CheckoutLink and CustomerPortalLink components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">CheckoutLink Component:</p>
            {process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID ? (
              <CheckoutLink
                polarApi={api.payments.polar}
                productIds={[process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID]}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Subscribe to Starter Plan
              </CheckoutLink>
            ) : (
              <p className="text-sm text-muted-foreground">
                Set NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID to test
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-medium mb-2">
              CustomerPortalLink Component:
            </p>
            <CustomerPortalLink
              polarApi={api.payments.polar}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Manage Subscription
            </CustomerPortalLink>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">
              Manual Portal URL Generation:
            </p>
            <Button
              variant="outline"
              onClick={handleGeneratePortalUrl}
              disabled={loading}
            >
              Generate Customer Portal URL
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
