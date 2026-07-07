// Client-side form validators, vendored from the design system. These mirror
// the shapes the marketing forms build; they run purely in the browser to give
// inline validation feedback (there is no backend in this public build).
import { z } from "zod";

/** Optional free-text field: blank/whitespace-only is coerced to null, never "". */
const optionalText = (max = 255) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().min(1).max(max).nullable().optional(),
  );

/** Optional UTM attribution parameters, shared across both domains. */
const UtmSchema = z
  .object({
    source: optionalText(),
    medium: optionalText(),
    campaign: optionalText(),
    term: optionalText(),
    content: optionalText(),
  })
  .optional();

/* ── Contact ──────────────────────────────────────────────────────────────*/

/** Allowed contact `type` values. */
export const CONTACT_TYPES = [
  "sales",
  "support",
  "bug",
  "partnership",
  "press",
  "general",
] as const;

export const ContactTypeSchema = z.enum(CONTACT_TYPES);
export type ContactType = z.infer<typeof ContactTypeSchema>;

/** Bug-severity vocabulary for `bug` contacts. */
const CONTACT_BUG_SEVERITIES = ["low", "medium", "high", "critical"] as const;

// Shared base; `message` is the only required detail.
const contactDetailsBase = {
  name: optionalText(),
  message: z.string().min(1).max(10_000),
  source: optionalText(),
  utm: UtmSchema,
};

const ContactBugDetailsSchema = z.object({
  ...contactDetailsBase,
  browser: optionalText(),
  os: optionalText(),
  steps_to_reproduce: optionalText(10_000),
  severity: z.enum(CONTACT_BUG_SEVERITIES).optional(),
});

const ContactDetailsBaseSchema = z.object(contactDetailsBase);

/** Contact submission — discriminated on `type` so `details` matches per-type. */
export const ContactRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bug"),
    email: z.email(),
    phone: z.string().min(1).max(50).optional(),
    details: ContactBugDetailsSchema,
  }),
  ...(["sales", "support", "partnership", "press", "general"] as const).map((t) =>
    z.object({
      type: z.literal(t),
      email: z.email(),
      phone: z.string().min(1).max(50).optional(),
      details: ContactDetailsBaseSchema,
    }),
  ),
]);
export type ContactRequest = z.infer<typeof ContactRequestSchema>;

/* ── Register (newsletter / waitlist) ───────────────────────────────────────*/

/** Allowed register `type` values. */
export const REGISTER_TYPES = [
  "newsletter",
  "product_updates",
  "webinar",
  "waitlist",
  "early_access",
  "announcements",
] as const;

export const RegisterTypeSchema = z.enum(REGISTER_TYPES);

// Base; `target` + `consent` are the explicit opt-in.
const registerDetailsBase = {
  name: optionalText(),
  target: z.string().min(1).max(255),
  consent: z.literal(true),
  source: optionalText(),
  // Optional waitlist questionnaire answers (multi-step flow).
  organization: optionalText(),
  feature_interest: optionalText(),
  operating_time: optionalText(),
  goals: z.array(z.string().min(1).max(255)).max(20).optional(),
  subscribed_at: z.iso.datetime().optional(),
  unsubscribed_at: z.iso.datetime().optional(),
  utm: UtmSchema,
};

const RegisterDetailsBaseSchema = z.object(registerDetailsBase);

const RegisterWebinarDetailsSchema = z.object({
  ...registerDetailsBase,
  timezone: optionalText(),
});

/** Register/subscribe submission — discriminated on `type`. */
export const SubscribeRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("webinar"),
    email: z.email(),
    phone: z.string().min(1).max(50).optional(),
    details: RegisterWebinarDetailsSchema,
  }),
  ...(["newsletter", "product_updates", "waitlist", "early_access", "announcements"] as const).map(
    (t) =>
      z.object({
        type: z.literal(t),
        email: z.email(),
        phone: z.string().min(1).max(50).optional(),
        details: RegisterDetailsBaseSchema,
      }),
  ),
]);
export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;

/** Unsubscribe — one-click `token`, or the `{ email, type, target }` fallback. */
export const UnsubscribeRequestSchema = z.union([
  z.object({ token: z.uuid() }),
  z.object({ email: z.email(), type: RegisterTypeSchema, target: z.string().min(1).max(255) }),
]);
export type UnsubscribeRequest = z.infer<typeof UnsubscribeRequestSchema>;
