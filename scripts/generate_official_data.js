// @ts-check
import db from "@genshin-db/tcg/src/min/data.min.json" assert { type: "json" };
import { fileURLToPath } from "node:url";
import { writeFile, readdir } from "node:fs/promises";
import * as path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outputDir = path.join(__dirname, "../src/data");

const {
  // @ts-ignore
  data: {
    ChineseSimplified: { tcgstatuseffects },
  },
} = db;

const result = [];

for (const obj of Object.values(tcgstatuseffects)) {
  if (obj.cardtype === "GCG_CARD_STATE" || obj.cardtype === "GCG_CARD_ONSTAGE" || obj.cardtype === "GCG_CARD_SUMMON") {
    result.push({
      id: obj.id,
      name: obj.name,
      description: obj.description,
      type: obj.cardtype,
    });
  }
}

await writeFile(path.join(outputDir, "official.json"), JSON.stringify(result, null, 2));

const images = await readdir(path.join(__dirname, "../public/Sprite"));
await writeFile(path.join(outputDir, "image_list.json"), JSON.stringify(images.filter(c => !c.includes('#')), null, 2));