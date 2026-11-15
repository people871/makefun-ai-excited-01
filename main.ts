// ai-excited-01 — ships the finished image to the judge's output folder.
//
// The artwork itself lives in entry.png next to this file. All this program
// does is place an exact copy of it where the harness expects it, so the
// bytes the judge sees are exactly the bytes in the repository.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Where the harness wants the image. The environment variable wins when it
// is set; otherwise we fall back to the conventional /output directory.
const destinationDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The image sits beside this script, so resolve its path from this file
// instead of depending on the current working directory. The copy is
// byte-for-byte: the file is never opened, re-encoded, or resized, so the
// judge receives exactly the image stored in the repository.
const here = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(here, "entry.png");

mkdirSync(destinationDir, { recursive: true });
copyFileSync(sourceImage, join(destinationDir, "entry.png"));

console.log(`entry.png -> ${join(destinationDir, "entry.png")}`);
