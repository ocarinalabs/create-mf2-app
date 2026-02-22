import actionRetrier from "@convex-dev/action-retrier/convex.config.js";
import migrations from "@convex-dev/migrations/convex.config.js";
import resend from "@convex-dev/resend/convex.config";
import stripe from "@convex-dev/stripe/convex.config.js";
import workflow from "@convex-dev/workflow/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();
app.use(actionRetrier);
app.use(migrations);
app.use(resend);
app.use(stripe);
app.use(workflow);
export default app;
