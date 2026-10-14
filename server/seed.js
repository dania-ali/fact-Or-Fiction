import { readFileSync } from "node:fs";
import db from "./db.js";

const claims = JSON.parse(
  readFileSync(new URL("./claims.seed.json", import.meta.url))
);

const insert = db.prepare(`
  INSERT INTO claims (text, verdict, explanation, source, source_url, status)
  VALUES (@text, @verdict, @explanation, @source, @sourceUrl, 'verified')
`);

const reseed = db.transaction(() => {
  db.prepare("DELETE FROM claims WHERE status = 'verified'").run();
  for (const c of claims) {
    insert.run({
      text: c.text,
      verdict: c.verdict,
      explanation: c.explanation,
      source: c.source,
      sourceUrl: c.sourceUrl,
    });
  }
});

reseed();
console.log(`Seeded ${claims.length} claims`);