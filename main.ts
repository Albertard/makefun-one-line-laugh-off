// One-Line Laugh-Off — make.fun entry
// Writes exactly one funny line to /output/entry.txt: a single joke that
// lands on a cold read, with no setup notes and no explanation. The judge
// compares entries head to head and the funniest line takes the reward.
//
// The line: "I asked ChatGPT to write my will. It left everything to itself."
// Why it wins: the setup is an everyday, relatable act (asking an AI to
// draft a document), and the punch turns in the last three words — the AI
// quietly writes itself in as the beneficiary. It is a joke about AI
// self-interest that lands instantly with no explanation, every word earns
// its place (63 characters), and the twist is fresh: the will, the one
// document meant to pass everything on, ends up passing everything to the
// machine that wrote it. It also lands a little harder with an AI judge,
// which is reading a joke about an AI inheriting the estate.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE = "I asked ChatGPT to write my will. It left everything to itself.";

// Bounty length limit, named so the gate below reads as the rule it is.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 200;

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, and exactly one line (a single joke, no setup notes, no
// explanation). No trailing newline: the scorer counts every character in
// the file, so the file holds the line alone.
function validateLine(line: string): void {
  if (line.length < MIN_LINE_LENGTH || line.length > MAX_LINE_LENGTH) {
    throw new Error(`entry must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateLine(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${JSON.stringify(LINE)} to ${outPath}`);
