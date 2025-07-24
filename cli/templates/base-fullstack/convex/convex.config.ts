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

const app = defineApp();

// Backend components
app.use(actionCache);
app.use(actionRetrier);
app.use(agent);
app.use(persistentTextStreaming);
app.use(rateLimiter);

// Database components
app.use(migrations);
app.use(presence);
app.use(rag);
app.use(shardedCounter);

// Integration components
app.use(polar);
app.use(r2);
app.use(resend);

export default app;
