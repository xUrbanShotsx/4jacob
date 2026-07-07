---
name: Briesa
description: Unified WHS, GRC and ISO certification platform for Australian business
colors:
  bg: "#121212"
  bg-secondary: "#171717"
  bg-canvas: "#101010"
  border: "#2e2e2e"
  text: "#fafafa"
  text-secondary: "#b4b4b4"
  text-tertiary: "#898989"
  text-muted: "#555555"
  signal-yellow: "#ffd600"
  signal-yellow-surface: "#3d3410"
  trust-blue: "#6ea8ff"
  trust-blue-surface: "#1a1f3a"
  field-green: "#3ecf8e"
  field-green-surface: "#1a3a2a"
  alert-coral: "#f06060"
  alert-coral-surface: "#3a1a1a"
typography:
  display:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Space Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.65rem"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  all: "0px"
spacing:
  section: "clamp(4rem, 10vw, 8rem)"
  card: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-yellow}"
    textColor: "{colors.text}"
    rounded: "{rounded.all}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.all}"
    padding: "8px 16px"
---

# Design System: Briesa

## 1. Overview

**Creative North Star: "The Audit Terminal"**

Briesa reads like the instrument panel of a serious compliance system that happens to be beautiful: dark, zero-radius, monospace-labelled, evidence-first. Every surface behaves like a printed inspection form crossed with a live dashboard — nothing is decorative, but nothing is boring either. The brand personality is confident, modern, sharp: it earns trust through precision (sharp edges, exact numbers, real data previews) rather than through softness or friendliness.

The system explicitly rejects legacy enterprise GRC software (dated, corporate, form-heavy) and generic bubbly SaaS gradients. It keeps its existing dark-first, editorial-typographic identity intact — that identity-preservation is deliberate, not a gap to fill with a redesign. What's changing is *dosage*: the system was previously Restrained (mono neutrals + one accent, ≤10% coverage); it now moves to a **Full palette** strategy — four named, semantic colors instead of one — because a compliance product has real categorical and status data (safe/at-risk, on-track/overdue, framework A/B/C) that a single accent can't encode. Color now carries meaning first, brand emphasis second.

**Key Characteristics:**
- Dark-first canvas, zero border-radius everywhere, hairline borders instead of shadows for structure
- Space Grotesk (display/body) + IBM Plex Mono (labels, data, uppercase tracked metadata) — unchanged, identity-preserving
- Four semantic accents replace the old single-accent restraint: signal yellow (brand/primary), trust blue (informational), field green (success/positive), alert coral (risk/attention)
- Motion is purposeful and status-driven: bars and rings encode real values, hovers lift and glow in the color of what they represent, reduced-motion always resolves to the visible end state

## 2. Colors

Dark-first, four-color semantic system over a monochrome neutral base. Each color owns a meaning, not a section — the same color always signals the same thing everywhere it appears.

### Primary
- **Signal Yellow** (`#ffd600`): the brand color. Primary CTAs, the hero's "unified.", live/active status, focus rings, the one thing on any screen you're meant to act on.

### Secondary
- **Trust Blue** (`#6ea8ff` dark / `#1a6ddb` light): informational and quality-framework contexts — ISO 9001 (quality) tags, docs/resource links, informational badges, secondary interactive accents.

### Tertiary
- **Field Green** (`#3ecf8e` dark / `#1a8a4a` light): positive/complete/success states — ISO 14001 (environmental) tags, "on track" and 100%-complete indicators, improving trend lines.

### Quaternary
- **Alert Coral** (`#f06060` dark / `#c1374a` light): risk, overdue, and attention states — overdue counters, below-threshold progress, incident spikes. Never used for anything that isn't actually a risk signal.

### Neutral
- **Ink** (`--text`, `#fafafa` dark / `#171717` light): primary text.
- **Ash** (`--text-secondary`/`--text-tertiary`/`--text-muted`): supporting text hierarchy, unchanged five-step scale.
- **Void** (`--bg`, `#121212` dark / `#ffffff` light): base canvas.
- **Slate** (`--bg-secondary`, `--border`): surfaces and hairline dividers.

### Named Rules
**The Meaning-First Rule.** A color is never applied to "break up monochrome." Trust Blue, Field Green, and Alert Coral only appear where they encode a real category or status (a framework, a trend, a risk level). If there's no meaning to encode, the element stays neutral.

**The One Brand Color Rule.** Signal Yellow is the only color that means "Briesa" rather than "this specific data point." It's reserved for CTAs, brand marks, and the single most important number on a screen (e.g. the audit-ready score) — never used as a generic success color, which is Field Green's job.

## 3. Typography

**Display Font:** Space Grotesk (with ui-sans-serif, system-ui fallback)
**Body Font:** Space Grotesk
**Label/Mono Font:** IBM Plex Mono

**Character:** A geometric sans doing double duty as both display and body, paired with a monospace for every label, timestamp, and data readout — the pairing itself signals "this is a system, not a story."

### Hierarchy
- **Display** (500 weight, `clamp(2.75rem, 6vw, 6rem)`, 0.98 line-height, -0.04em tracking): hero headline only.
- **Headline** (500 weight, 1.75–2.5rem): section titles.
- **Title** (500 weight, 1.125–1.25rem): card/component headings.
- **Body** (400 weight, 1rem–1.125rem, 1.6 line-height, capped ~70ch): paragraph copy.
- **Label** (500 weight, 0.6–0.65rem, 0.1em tracking, uppercase, IBM Plex Mono): metadata, chart axis labels, status tags.

### Named Rules
**The Mono-Means-Data Rule.** IBM Plex Mono is reserved for anything that is data, metadata, or a status label. It never appears in prose. If it's a sentence, it's Space Grotesk.

## 4. Elevation

Flat by default — no ambient drop shadows for static layout. Depth comes from a 1px border (`--border`) and background-lightness steps (`--bg` → `--bg-secondary` → `--bg-hover`), not shadow. Shadows are reserved for genuinely floating layers (dropdown panels, the dashboard preview mock) and, newly, as **interaction feedback**: a soft, color-tinted glow appears only on hover/focus of an interactive element, in the color that element itself represents.

### Shadow Vocabulary
- **Panel** (`shadow-2xl shadow-black/5` light / `shadow-black/20` dark): dropdown menus, the dashboard preview frame — genuinely elevated surfaces.
- **Interactive glow** (`box-shadow: 0 8px 24px -8px var(--glow-color)`, tuned per accent): hover state on buttons and cards, colored to match the element's semantic accent (yellow for primary CTAs, blue/green/coral for tagged cards).

### Named Rules
**The Flat-Until-Touched Rule.** Every surface is flat at rest. Shadow only appears as a direct response to hover/focus — it is feedback, not decoration.

## 5. Components

### Buttons
- **Shape:** zero radius, 1px border, sharp corners throughout (0px).
- **Primary:** Signal Yellow background, ink text (near-black in light mode, near-white in dark mode — never white-on-yellow), lifts 1-2px and gains a yellow-tinted glow on hover.
- **Secondary:** neutral border + bg, hover lifts and shifts border toward Signal Yellow.
- **Ghost:** transparent, text-only, hover fills with `bg-hover`.
- **Destructive:** Alert Coral bg/border/text, reserved for genuinely destructive or risk-framed actions.

### Cards / Containers
- **Corner Style:** 0px, always.
- **Background:** `--bg` on `--bg-secondary`, or vice versa, for contrast between nested surfaces.
- **Shadow Strategy:** flat at rest; colored glow + 2-4px lift on hover for interactive cards (feature tiles, pricing tiers).
- **Border:** 1px hairline, `--border`, shifts to the card's assigned accent color on hover when the card represents a category (e.g. a feature pillar).
- **Internal Padding:** 1.5rem (24px) typical.

### Navigation
- Text links in `--text-secondary`, hover to `--text` plus an animated underline that sweeps in from the left in Signal Yellow (`transform: scaleX(0→1)`, 200ms, transform-origin left).
- Mega-menu panels: flat bg, 1px border, no radius, fade+scale entrance (0.98→1, 200ms).
- Mobile: full-bleed sheet, same zero-radius language.

### Data Visualization (signature component)
Rings, sparklines, bar charts and progress rows (`graphs.tsx`) are the system's signature surface — the "instrument panel" the whole brand voice is built around. Each now accepts a semantic `tone` (`primary` / `success` / `info` / `danger`) instead of rendering everything in ink. Thresholds map to tone automatically where the data is a status (e.g. progress ≥90% → success, ≥70% → primary, below → danger) so the color reports the real state, never a decorative choice.

## 6. Do's and Don'ts

### Do:
- **Do** keep every new color tied to a real meaning: Trust Blue = informational/quality, Field Green = success/positive, Alert Coral = risk/overdue, Signal Yellow = brand/primary action.
- **Do** keep zero border-radius and hairline borders everywhere; this is the identity, not a default to reconsider.
- **Do** use the dashboard preview's data (compliance ring, sparkline, prestart bars) as the primary place color now reports real status.
- **Do** add hover glow/lift feedback in the element's own semantic color — it's interaction feedback, not decoration.
- **Do** keep every animation's `prefers-reduced-motion` fallback resolving to the fully visible end state (per the existing CSS safety net in globals.css).

### Don't:
- **Don't** apply Trust Blue, Field Green, or Alert Coral anywhere that isn't encoding a real category or status — that's decoration, not the Meaning-First Rule.
- **Don't** drift toward generic bubbly SaaS gradients or dated, form-heavy legacy-GRC visual language — both are named anti-references from PRODUCT.md.
- **Don't** use white text on a Signal Yellow background (fails contrast) — use the theme's ink token instead.
- **Don't** add border-radius anywhere; zero-radius is load-bearing to the brand, not a gap.
- **Don't** gate content visibility on a scroll-triggered class; reveals must enhance an already-visible default so hidden tabs and headless renders never ship blank.
