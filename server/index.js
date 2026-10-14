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
  const rows = db
    .prepare(
      `SELECT ${FIELDS} FROM claims WHERE status = 'verified' ORDER BY RANDOM() LIMIT 5`
    )
    .all();
  res.json(rows);
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