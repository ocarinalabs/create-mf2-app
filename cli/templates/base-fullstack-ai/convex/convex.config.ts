import { defineApp } from "convex/server";
import resend from "@convex-dev/resend/convex.config";
import actionCache from "@convex-dev/action-cache/convex.config";
import actionRetrier from "@convex-dev/action-retrier/convex.config";
import agent from "@convex-dev/agent/convex.config";
import migrations from "@convex-dev/migrations/convex.config";
import persistentTextStreaming from "@convex-dev/persistent-text-streaming/convex.config";
import polar from "@convex-dev/polar/convex.config";
import presence from "@convex-dev/presence/convex.config";
import r2 from "@convex-dev/r2/convex.config";
import rag from "@convex-dev/rag/convex.config";
import rateLimiter from "@convex-dev/rate-limiter/convex.config";
import shardedCounter from "@convex-dev/sharded-counter/convex.config";
import workflow from "@convex-dev/workflow/convex.config";

const app = defineApp();

// AI components
app.use(agent);
app.use(rag);

// Backend infrastructure
app.use(actionCache);
app.use(actionRetrier);
app.use(persistentTextStreaming);
app.use(rateLimiter);
app.use(workflow);

// Database components
app.use(migrations);
app.use(presence);
app.use(shardedCounter);

// Third-party integrations
app.use(polar);
app.use(r2);
app.use(resend);

export default app;
