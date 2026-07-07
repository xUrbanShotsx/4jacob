"use client";

import { type FormEvent, useId, useState } from "react";
import { Button, Checkbox, Input, Label } from "@/components/ui";
import { SubscribeRequestSchema } from "@/lib/schemas";

export function NewsletterForm() {
  const emailId = useId();
  const nameId = useId();
  const consentId = useId();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!consent) {
      setError("Please tick the consent box so we can email you the newsletter.");
      return;
    }

    const trimmedName = name.trim();
    const payload = {
      type: "newsletter" as const,
      email: email.trim(),
      details: {
        target: "weekly" as const,
        consent: true as const,
        ...(trimmedName ? { name: trimmedName } : {}),
      },
    };

    const parsed = SubscribeRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setError(first?.message ?? "Please check your details and try again.");
      return;
    }

    // Public build: there is no backend. Acknowledge the submission locally so
    // the form still validates and confirms; wire this up to a real endpoint
    // (or a service like Formspree) to actually capture subscribers.
    setStatus("submitting");
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="border border-accent-border bg-accent-bg p-6" role="status">
        <p className="font-medium text-text">You're subscribed</p>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks for joining the Briesa weekly — keep an eye on{" "}
          <span className="text-text">{email.trim()}</span> for your first digest. You can
          unsubscribe from any email.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor={emailId}>Email address</Label>
        <Input
          id={emailId}
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com.au"
          disabled={submitting}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={nameId}>Name (optional)</Label>
        <Input
          id={nameId}
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Smith"
          disabled={submitting}
        />
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id={consentId}
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={submitting}
          className="mt-0.5"
        />
        <Label htmlFor={consentId} className="leading-snug">
          I agree to receive the weekly Briesa newsletter and understand I can unsubscribe at any
          time.
        </Label>
      </div>

      {error ? (
        <p role="alert" className="text-destructive-text text-sm">
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
