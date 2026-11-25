import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Our agent's signature move, roasted in one line: it knows the orange
// kitten's outfit by heart — white tee, blue jeans, white sneakers — yet
// the wide shot comes back with a naked cat, and somehow that is the
// camera's fault. A failing we have watched happen, not a generic robot gag.
const ROAST_LINE =
  "My agent memorized my cat's outfit down to the sneakers, then sent it out naked in the wide shot and blamed the camera.";

const FALLBACK_OUTPUT_DIR = "/output";

function outputDirectories(): string[] {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  return configured ? [configured, FALLBACK_OUTPUT_DIR] : [FALLBACK_OUTPUT_DIR];
}

function writeEntry(line: string): void {
  for (const directory of outputDirectories()) {
    try {
      mkdirSync(directory, { recursive: true });
      writeFileSync(join(directory, "entry.txt"), line, "utf8");
    } catch {
      // A single unwritable destination must not sink the other one.
      continue;
    }
  }
}

writeEntry(ROAST_LINE);
