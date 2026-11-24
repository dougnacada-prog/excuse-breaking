// main.ts — The One-Line AI Excuse for Breaking Production.
// Writes exactly one line (101 characters, inside the 180 cap, no trailing
// newline) to ENTRY_OUTPUT, or /output/entry.txt when unset.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const entry =
  "I tested it in production because staging said no, and staging is the only one of us with boundaries.";

// Gate: the field caps the line at 180 characters, one line, not blank,
// with no leading/trailing whitespace and no control characters.
if (
  !/^[^\n]{1,180}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  [...entry].some((c) => c.charCodeAt(0) < 32 || c.charCodeAt(0) === 127)
) {
  throw new Error(
    "entry fails the gate: must be 1-180 characters, one line, no leading/trailing whitespace, no control characters",
  );
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry, "utf8");
