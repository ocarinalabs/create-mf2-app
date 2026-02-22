import {
  createMiddleware,
  defaults,
  type Options,
  withVercelToolbar,
} from "@nosecone/next";

export const securityMiddleware = createMiddleware;

// Nosecone security headers configuration
// https://docs.arcjet.com/nosecone/quick-start
export const noseconeOptions: Options = {
  ...defaults,
  // Content Security Policy (CSP) is disabled by default because the values
  // depend on which features are enabled.
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  referrerPolicy: {
    policy: ["strict-origin-when-cross-origin"],
  },
};

export const noseconeOptionsWithToolbar: Options =
  withVercelToolbar(noseconeOptions);
