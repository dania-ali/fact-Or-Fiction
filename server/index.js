import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

const FIELDS = "id, text, verdict, explanation, source, source_url AS sourceUrl";

app.get("/api/claims", (req, res) => {
  const rows = db
    .prepare(`SELECT ${FIELDS} FROM claims WHERE status = 'verified'`)
    .all();
  res.json(rows);
});

app.get("/api/claims/round", (req, res) => {
  const lang = req.query.lang === "es" ? "es" : "en";
  const rows = db
    .prepare(
      `SELECT c.id, c.verdict, c.source, c.source_url AS sourceUrl,
              COALESCE(t.text, c.text) AS text,
              COALESCE(t.explanation, c.explanation) AS explanation,
              CASE WHEN t.claim_id IS NOT NULL THEN 1 ELSE 0 END AS translated
       FROM claims c
       LEFT JOIN claim_translations t
         ON t.claim_id = c.id AND t.language = ? AND t.reviewed = 1
       WHERE c.status = 'verified'
       ORDER BY RANDOM() LIMIT 5`
    )
    .all(lang);
  res.json(
    rows.map(({ translated, ...r }) => ({
      ...r,
      language: translated ? lang : "en",
    }))
  );
});

app.post("/api/claims", (req, res) => {
  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) {
    return res.status(400).json({ error: "Claim is required" });
  }
  if (text.length > 280) {
    return res
      .status(400)
      .json({ error: "Claim is too long (280 characters max)" });
  }
  const info = db
    .prepare("INSERT INTO claims (text, status) VALUES (?, 'pending')")
    .run(text);
  res.status(201).json({ id: info.lastInsertRowid, text, status: "pending" });
});

app.listen(3001, () => console.log("API on http://localhost:3001"));