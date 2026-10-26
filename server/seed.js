import { readFileSync } from "node:fs";
import db from "./db.js";

const claims = JSON.parse(
  readFileSync(new URL("./claims.seed.json", import.meta.url))
);

const insertClaim = db.prepare(`
  INSERT INTO claims (text, verdict, explanation, source, source_url, status)
  VALUES (@text, @verdict, @explanation, @source, @sourceUrl, 'verified')
`);

const insertTranslation = db.prepare(`
  INSERT INTO claim_translations (claim_id, language, text, explanation, reviewed)
  VALUES (@claimId, @language, @text, @explanation, @reviewed)
`);

const reseed = db.transaction(() => {
  db.prepare("DELETE FROM claim_translations").run();
  db.prepare("DELETE FROM claims WHERE status = 'verified'").run();
  for (const c of claims) {
    const { lastInsertRowid } = insertClaim.run({
      text: c.text,
      verdict: c.verdict,
      explanation: c.explanation,
      source: c.source,
      sourceUrl: c.sourceUrl,
    });
    for (const [language, t] of Object.entries(c.translations ?? {})) {
      insertTranslation.run({
        claimId: lastInsertRowid,
        language,
        text: t.text,
        explanation: t.explanation,
        reviewed: t.reviewed ? 1 : 0,
      });
    }
  }
});

reseed();
console.log(`Seeded ${claims.length} claims`);