import "server-only";
import Stripe from "stripe";
import { keys } from "./keys";

const secretKey = keys().STRIPE_SECRET_KEY;

export const stripe = secretKey
  ? new Stripe(secretKey, { apiVersion: "2025-11-17.clover" })
  : undefined;

export type { Stripe } from "stripe";
