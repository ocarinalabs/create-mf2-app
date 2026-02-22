import { ConvexHttpClient } from "convex/browser";
import { keys } from "./keys";

const env = keys();

export const convexHttpClient = new ConvexHttpClient(
  env.NEXT_PUBLIC_CONVEX_URL
);
