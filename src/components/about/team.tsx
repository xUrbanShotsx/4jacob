"use client";

import { motion } from "motion/react";
import { FadeUp, fadeUpItem, Reveal, Stagger } from "@/components/motion";

const CAREERS_EMAIL = "hello@briesa.com.au";

const TEAM = [
  { name: "Jordan Avery", role: "Co-founder · Product" },
  { name: "Sam Whitford", role: "Co-founder · Engineering" },
];

const OPEN_ROLES = [{ role: "Product Engineer" }, { role: "Customer Engineer" }];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TeamCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden border border-border bg-bg-secondary">
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-medium text-6xl text-border-strong tracking-tighter transition-colors duration-500 group-hover:text-text-secondary md:text-7xl">
          {initials(name)}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-lg tracking-tight">{name}</p>
        <p className="mt-1 font-mono text-[0.6rem] text-text-tertiary uppercase tracking-wider">
          {role}
        </p>
      </div>
    </div>
  );
}

function OpenRoleCard({ role }: { role: string }) {
  return (
    <a
      href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${role}`)}`}
      className="group relative block aspect-[4/5] overflow-hidden border border-border border-dashed bg-bg transition-colors hover:border-text"
    >
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-2xl text-text-tertiary tracking-tight transition-opacity duration-300 group-hover:opacity-0">
          You?
        </span>
        <span className="absolute inline-flex items-center gap-1.5 border border-text bg-text px-4 py-1.5 font-mono text-[0.6rem] text-bg uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Apply now →
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-lg tracking-tight">{role}</p>
        <p className="mt-1 font-mono text-[0.6rem] text-accent-text uppercase tracking-wider">
          Open position
        </p>
      </div>
    </a>
  );
}

export function Team() {
  return (
    <section id="team" className="section-padding scroll-mt-24">
      <div className="web-container">
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] text-text-tertiary uppercase tracking-wider">
              <span className="h-px w-6 bg-border-strong" />
              The team
            </span>
            <Reveal className="mt-4">
              <h2 className="text-balance text-3xl tracking-tighter md:text-4xl lg:text-5xl">
                Small team, <span className="text-text-secondary">close to the work.</span>
              </h2>
            </Reveal>
          </div>
          <FadeUp className="md:self-end">
            <p className="text-sm text-text-secondary leading-relaxed md:text-base">
              No layers, no middle management — just founders who ship fast and talk to the people
              on site every day. We're growing the team, carefully.
            </p>
          </FadeUp>
        </div>

        <Stagger
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          stagger={0.12}
          amount={0.2}
        >
          {TEAM.map((member) => (
            <motion.div key={member.name} variants={fadeUpItem}>
              <TeamCard {...member} />
            </motion.div>
          ))}
          {OPEN_ROLES.map((slot) => (
            <motion.div key={slot.role} variants={fadeUpItem}>
              <OpenRoleCard {...slot} />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
