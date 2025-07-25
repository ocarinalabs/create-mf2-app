# Polar Setup Guide for MF2 Stack

## Quick Fix for Your Current Issue

The Convex Polar component only supports **subscription products with fixed pricing**. Your current products are one-time payments with custom/pay-what-you-want pricing, which is why the sync is failing.

### Step 1: Create Subscription Products in Polar

1. Go to https://polar.sh (make sure you're in **production** mode)
2. Archive your existing one-time products (they can't be deleted)
3. Create new products with these settings:
   - **Type**: Subscription (NOT one-time)
   - **Pricing**: Fixed price (NOT custom/pay-what-you-want)
   - **Example**: $9/month, $29/month, etc.

### Step 2: Sync Products

1. Run your Convex dev server: `npx convex dev`
2. Go to http://localhost:3000/test-polar
3. Click "Sync Products from Polar"
4. You'll see how many products were synced vs skipped

## What Our Custom Sync Does

The custom `syncProducts` function in `convex/polar.ts` (based on [this GitHub issue](https://github.com/get-convex/polar/issues/7)):

### Features:
- ✅ Syncs existing products (not just new ones via webhooks)
- ✅ Archives Convex products that no longer exist in Polar
- ✅ Updates existing products and creates new ones
- ✅ Filters out incompatible products:
  - ❌ Archived products
  - ❌ One-time payment products
  - ❌ Products with custom/pay-what-you-want pricing
  - ✅ Only syncs subscription products with fixed pricing

### Sync Statistics:
- **Created**: New products added to Convex
- **Synced**: Existing products updated
- **Skipped**: Incompatible products filtered out
- **Archived**: Products removed from Polar but kept in Convex (archived)

## Example Product Setup

### Starter Plan
- Name: "Starter Plan"
- Type: Subscription
- Price: $9/month (fixed)
- Billing: Monthly

### Pro Plan
- Name: "Pro Plan"
- Type: Subscription
- Price: $29/month (fixed)
- Billing: Monthly

## Environment Variables

After creating products, add their IDs to `.env.local`:

```env
NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID=prod_xxxxx
NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID=prod_xxxxx
```

## Why Manual Sync is Needed

The Convex Polar component was designed for greenfield projects and only syncs products via webhooks when they're created/updated AFTER the integration is set up. This means:

- Products created before the integration won't appear automatically
- You need to manually sync when connecting to an existing Polar project
- The sync function ensures consistency between Polar and Convex

## Testing

1. Create subscription products in Polar
2. Sync products using the test page
3. Test checkout flow
4. Test customer portal

The sync will show you exactly how many products were created, updated, skipped, or archived!