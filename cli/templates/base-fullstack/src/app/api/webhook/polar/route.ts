import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle webhook events
    switch (payload.type) {
      case "checkout.created":
        console.log("Checkout created:", payload.data.id);
        // Add your business logic here
        break;

      case "checkout.updated":
        console.log("Checkout updated:", payload.data.id);
        // Handle checkout completion
        if (payload.data.status === "succeeded") {
          // User successfully paid
          console.log("Payment successful for checkout:", payload.data.id);
        }
        break;

      case "subscription.created":
        console.log("Subscription created:", payload.data.id);
        // Set up user subscription in your database
        break;

      case "subscription.updated":
        console.log("Subscription updated:", payload.data.id);
        // Update subscription status
        break;

      case "subscription.canceled":
        console.log("Subscription canceled:", payload.data.id);
        // Handle subscription cancellation
        break;

      case "order.created":
        console.log("Order created:", payload.data.id);
        // Process new order
        break;

      default:
        console.log(`Unhandled webhook event: ${payload.type}`);
    }
  },
});