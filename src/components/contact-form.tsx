"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Select,
  type SelectOption,
  Textarea,
  ToastProvider,
  useToast,
} from "@/components/ui";
import { ContactRequestSchema, type ContactType } from "@/lib/schemas";

const TYPE_OPTIONS: SelectOption[] = [
  { value: "sales", label: "Sales — demos & pricing" },
  { value: "support", label: "Support — existing customers" },
  { value: "bug", label: "Report a bug" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press & media" },
  { value: "general", label: "General enquiry" },
];

type FieldErrors = Partial<Record<"email" | "phone" | "message", string>>;

/** Builds the API payload, omitting blank optional fields so the schema's
 *  `optionalText` preprocess never has to coerce empty strings. */
function buildPayload(input: {
  type: ContactType;
  email: string;
  phone: string;
  message: string;
  name: string;
}) {
  const details: { message: string; name?: string; source?: string } = {
    message: input.message.trim(),
    source: "web/contact",
  };
  const name = input.name.trim();
  if (name) details.name = name;

  const payload: {
    type: ContactType;
    email: string;
    phone?: string;
    details: typeof details;
  } = {
    type: input.type,
    email: input.email.trim(),
    details,
  };
  const phone = input.phone.trim();
  if (phone) payload.phone = phone;

  return payload;
}

function ContactFormInner() {
  const { success } = useToast();

  const [type, setType] = useState<ContactType>("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const payload = buildPayload({ type, email, phone, message, name });
    const parsed = ContactRequestSchema.safeParse(payload);

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        if (path === "email") next.email = "Enter a valid email address.";
        else if (path === "phone") next.phone = "Enter a valid phone number, or leave blank.";
        else if (path === "details.message") next.message = "Please tell us how we can help.";
      }
      // Fallback so a stray issue still surfaces somewhere.
      if (Object.keys(next).length === 0) next.message = "Please check your details and try again.";
      setErrors(next);
      return;
    }

    // Public build: there is no backend. Confirm locally with a
    // client-generated reference. Wire `parsed.data` to a real endpoint (or a
    // service like Formspree) to actually deliver the message.
    setSubmitting(true);
    setToken(crypto.randomUUID());
    success("Thanks — your message is on its way.");
    setSubmitting(false);
  }

  if (token) {
    return (
      <div className="border border-accent-border bg-accent-bg p-8 text-center">
        <h2 className="font-semibold text-text text-xl tracking-tight">Message received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
          Thanks for reaching out. A member of the Briesa team will reply within one business day
          (AEST). Keep your reference handy if you need to follow up.
        </p>
        <p className="mt-4 text-text-tertiary text-xs uppercase tracking-wide">Reference</p>
        <p className="mt-1 break-all font-mono text-sm text-text">{token}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 text-left">
      <div className="space-y-1.5">
        <Label htmlFor="contact-type">What's this about?</Label>
        <Select
          id="contact-type"
          options={TYPE_OPTIONS}
          value={type}
          onValueChange={(v) => setType(v as ContactType)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Jordan Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact-email">
            Email <span className="text-text-tertiary">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            placeholder="you@company.com.au"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-[12px] text-destructive-text">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? true : undefined}
            placeholder="+61 4XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-[12px] text-destructive-text">{errors.phone}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message">
          Message <span className="text-text-tertiary">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          placeholder="Tell us a little about your organisation and what you're trying to solve."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {errors.message && <p className="text-[12px] text-destructive-text">{errors.message}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-text-tertiary text-xs">
          We'll only use your details to respond to this enquiry.
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <ToastProvider>
      <ContactFormInner />
    </ToastProvider>
  );
}
