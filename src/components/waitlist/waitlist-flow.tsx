"use client";

import { ArrowLeft, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useId, useState } from "react";
import { EASE, FadeUp, Stagger } from "@/components/motion";
import { Typewriter } from "@/components/typewriter";
import { Button, cn, Input, Label } from "@/components/ui";
import { SubscribeRequestSchema } from "@/lib/schemas";

/* ── Content (mirrors briesa.com/waitlist, in this app's green design system) ── */
const WORDS = ["Waitlist.", "Future.", "Journey.", "Movement.", "Waitlist."];
const TARGET = "launch";
const REDIRECT_MS = 2600;

const BENEFITS: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Early access",
    body: "Be among the first to explore our platform when we launch.",
  },
  {
    no: "02",
    title: "Product updates",
    body: "Get notified about new features and platform developments.",
  },
  {
    no: "03",
    title: "Partnership priority",
    body: "Priority consideration for integrations and partnerships.",
  },
];

const FEATURES = [
  "AI ISO Templates",
  "Policy & Procedure Generation",
  "AI Auditing Systems",
  "All of the above",
];

const GOALS = [
  "Streamline & automate compliance processes",
  "Achieve and maintain ISO certification efficiently",
  "Build a culture of continuous compliance & improvement",
  "Reduce risk & strengthen governance",
];

const OPERATING = ["0–12 months", "1–3 years", "3–10 years", "10 years +"];

const stepMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.3, ease: EASE },
};

/* ── Small building blocks ────────────────────────────────────────────────── */
function Backdrop() {
  return (
    <>
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_55%_60%_at_50%_-10%,var(--accent-bg)_0%,transparent_70%)] opacity-50"
      />
    </>
  );
}

function Progress({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className={cn(
            "h-[3px] flex-1 transition-colors duration-300",
            n <= current ? "bg-accent-text" : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

function StepHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-mono text-[0.6rem] text-accent-text uppercase tracking-[0.15em]">
        {label}
      </span>
      <h2 className="mt-3 text-balance text-3xl tracking-tighter md:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2.5 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Option({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center justify-between gap-3 border px-4 py-3.5 text-left text-[13px] transition-colors",
        selected
          ? "border-accent-border bg-accent-bg text-text"
          : "border-border bg-bg-secondary text-text-secondary hover:border-border-hover hover:text-text",
      )}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border",
          selected ? "border-accent-border bg-accent-bg" : "border-border-strong",
        )}
      >
        {selected ? <Check className="size-3 text-accent-text" strokeWidth={3} /> : null}
      </span>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="lg" type="button" onClick={onClick}>
      <ArrowLeft className="size-3.5" />
      Back
    </Button>
  );
}

/* ── The flow ─────────────────────────────────────────────────────────────── */
export function WaitlistFlow() {
  const router = useRouter();
  const firstId = useId();
  const lastId = useId();
  const emailId = useId();
  const phoneId = useId();
  const orgId = useId();

  // 0 = intro; 1–4 = steps; done = thank-you.
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [feature, setFeature] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [operating, setOperating] = useState<string | null>(null);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleGoal = (g: string) =>
    setGoals((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g]));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const name = [first.trim(), last.trim()].filter(Boolean).join(" ");
    const payload = {
      type: "waitlist" as const,
      email: email.trim(),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      details: {
        target: TARGET,
        consent: true as const,
        ...(name ? { name } : {}),
        ...(org.trim() ? { organization: org.trim() } : {}),
        ...(feature ? { feature_interest: feature } : {}),
        ...(operating ? { operating_time: operating } : {}),
        ...(goals.length ? { goals } : {}),
      },
    };

    const parsed = SubscribeRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }

    // Public build: there is no backend. Confirm locally and redirect home.
    // Wire `parsed.data` to a real endpoint to actually capture signups.
    setSubmitting(true);
    setDone(true);
    setTimeout(() => router.push("/"), REDIRECT_MS);
  }

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.section
          key="done"
          {...stepMotion}
          className="hero-padding relative overflow-hidden"
        >
          <Backdrop />
          <div className="web-container relative">
            <div className="mx-auto flex min-h-[48vh] max-w-xl flex-col items-center justify-center text-center">
              <span className="flex size-14 items-center justify-center border border-accent-border bg-accent-bg">
                <Check className="size-7 text-accent-text" strokeWidth={2.5} />
              </span>
              <h2 className="mt-8 text-balance text-4xl tracking-tighter md:text-5xl">
                Thank you.
              </h2>
              <p className="mt-4 max-w-sm text-text-secondary leading-relaxed">
                You're on the Briesa waitlist — we'll be in touch as access opens up.
              </p>
              <p className="mt-6 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                Redirecting you home…
              </p>
            </div>
          </div>
        </motion.section>
      ) : step === 0 ? (
        <motion.div key="intro" {...stepMotion}>
          <section className="hero-padding relative overflow-hidden">
            <Backdrop />
            <div className="web-container relative">
              <Stagger className="mx-auto max-w-3xl text-center" stagger={0.09}>
                <FadeUp asChild>
                  <span className="inline-flex items-center justify-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                    <span className="h-px w-6 bg-border-strong" />
                    Stop guessing, get certified.
                  </span>
                </FadeUp>
                <FadeUp asChild>
                  <h1 className="mt-4 text-balance text-5xl tracking-tighter md:text-6xl lg:text-7xl">
                    Join the
                    <br />
                    <Typewriter words={WORDS} className="text-accent-text" />
                  </h1>
                </FadeUp>
                <FadeUp asChild>
                  <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-text-secondary leading-relaxed">
                    Be among the first to access our intelligent compliance platform.
                  </p>
                </FadeUp>
              </Stagger>
            </div>
          </section>

          <section className="pb-10">
            <div className="web-container">
              <Stagger
                className="grid gap-px border border-border bg-border md:grid-cols-3"
                stagger={0.08}
              >
                {BENEFITS.map((b) => (
                  <FadeUp key={b.no} asChild>
                    <div className="flex flex-col gap-3 bg-bg p-7">
                      <span className="font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
                        {b.no}
                      </span>
                      <h3 className="text-lg tracking-tight">{b.title}</h3>
                      <p className="text-sm text-text-tertiary leading-relaxed">{b.body}</p>
                    </div>
                  </FadeUp>
                ))}
              </Stagger>
            </div>
          </section>

          <section className="pb-24">
            <FadeUp className="flex flex-col items-center gap-4">
              <Button variant="primary" size="lg" onClick={() => setStep(1)}>
                Get started
              </Button>
              <p className="font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                No spam — unsubscribe anytime
              </p>
            </FadeUp>
          </section>
        </motion.div>
      ) : (
        <motion.section
          key={`step-${step}`}
          {...stepMotion}
          className="hero-padding relative overflow-hidden"
        >
          <Backdrop />
          <div className="web-container relative">
            <div className="mx-auto flex min-h-[58vh] w-full max-w-[520px] flex-col">
              <Progress current={step} />

              <div className="mt-10 flex flex-1 flex-col">
                {step === 1 ? (
                  <>
                    <StepHeader
                      label="Step 1 // Feature interest"
                      title={
                        <>
                          Which feature interests
                          <br />
                          you the most?
                        </>
                      }
                    />
                    <div className="mt-8 flex flex-col gap-2.5">
                      {FEATURES.map((f) => (
                        <Option
                          key={f}
                          label={f}
                          selected={feature === f}
                          onClick={() => setFeature(f)}
                        />
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-3">
                      <BackButton onClick={() => setStep(0)} />
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setStep(2)}
                        disabled={!feature}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                ) : null}

                {step === 2 ? (
                  <>
                    <StepHeader
                      label="Step 2 // Your goals"
                      title={
                        <>
                          What do you hope
                          <br />
                          to achieve?
                        </>
                      }
                      subtitle="Select all that apply"
                    />
                    <div className="mt-8 flex flex-col gap-2.5">
                      {GOALS.map((g) => (
                        <Option
                          key={g}
                          label={g}
                          selected={goals.includes(g)}
                          onClick={() => toggleGoal(g)}
                        />
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-3">
                      <BackButton onClick={() => setStep(1)} />
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setStep(3)}
                        disabled={goals.length === 0}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                ) : null}

                {step === 3 ? (
                  <>
                    <StepHeader
                      label="Step 3 // Operating time"
                      title={
                        <>
                          How long has your
                          <br />
                          organisation been operating?
                        </>
                      }
                    />
                    <div className="mt-8 flex flex-col gap-2.5">
                      {OPERATING.map((o) => (
                        <Option
                          key={o}
                          label={o}
                          selected={operating === o}
                          onClick={() => setOperating(o)}
                        />
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-3">
                      <BackButton onClick={() => setStep(2)} />
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setStep(4)}
                        disabled={!operating}
                      >
                        Continue
                      </Button>
                    </div>
                  </>
                ) : null}

                {step === 4 ? (
                  <>
                    <StepHeader label="Step 4 // Your details" title="Almost there." />
                    <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-4">
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-1 flex-col gap-1.5">
                          <Label htmlFor={firstId}>First name</Label>
                          <Input
                            id={firstId}
                            inputSize="lg"
                            autoComplete="given-name"
                            placeholder="Jane"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            disabled={submitting}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                          <Label htmlFor={lastId}>Last name</Label>
                          <Input
                            id={lastId}
                            inputSize="lg"
                            autoComplete="family-name"
                            placeholder="Doe"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                            disabled={submitting}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={emailId}>Email address</Label>
                        <Input
                          id={emailId}
                          inputSize="lg"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          placeholder="name@company.com.au"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={phoneId}>Phone number (optional)</Label>
                        <Input
                          id={phoneId}
                          inputSize="lg"
                          type="tel"
                          autoComplete="tel"
                          placeholder="04 0000 0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={submitting}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor={orgId}>Organisation name (optional)</Label>
                        <Input
                          id={orgId}
                          inputSize="lg"
                          autoComplete="organization"
                          placeholder="Acme Pty Ltd"
                          value={org}
                          onChange={(e) => setOrg(e.target.value)}
                          disabled={submitting}
                        />
                      </div>

                      {error ? (
                        <p role="alert" className="text-destructive-text text-sm">
                          {error}
                        </p>
                      ) : null}

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <BackButton onClick={() => setStep(3)} />
                        <Button
                          variant="primary"
                          size="lg"
                          type="submit"
                          disabled={submitting || email.trim() === ""}
                        >
                          {submitting ? "Joining…" : "Join the waitlist"}
                        </Button>
                      </div>
                      <p className="text-center text-text-tertiary text-xs leading-relaxed">
                        By joining you agree to receive product and access updates from Briesa Pty
                        Ltd, handled per our{" "}
                        <Link
                          href="/privacy"
                          className="underline decoration-border underline-offset-4"
                        >
                          Privacy Policy
                        </Link>
                        . No spam — unsubscribe anytime.
                      </p>
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
