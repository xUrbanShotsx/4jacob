"use client";

import { useEffect, useState } from "react";

/**
 * Types one word at a time, holds, deletes, then advances — then stops on the
 * final word (cursor disappears), mirroring the waitlist hero on briesa.com.
 * Colour comes from the caller via `className` (the cursor inherits it via
 * `bg-current`). Starts empty so SSR and the first client render
 * agree (no hydration mismatch); reduced-motion users get the global animation
 * override, which freezes the caret.
 */
export function Typewriter({
  words,
  typeMs = 50,
  deleteMs = 30,
  holdMs = 2000,
  className,
}: {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const last = words.length - 1;
  const word = words[index] ?? "";
  // Mirror the live page: once the final word is fully typed, the loop ends.
  const finished = index === last && text === word;

  useEffect(() => {
    if (finished) return;

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => Math.min(i + 1, last));
      return;
    }
    const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
    const t = setTimeout(() => setText(next), deleting ? deleteMs : typeMs);
    return () => clearTimeout(t);
  }, [text, deleting, word, finished, last, typeMs, deleteMs, holdMs]);

  return (
    <span className={className}>
      {text}
      {!finished && (
        <span
          aria-hidden
          className="ml-[2px] inline-block h-[0.85em] w-[0.06em] animate-caret bg-current align-middle"
        />
      )}
    </span>
  );
}
