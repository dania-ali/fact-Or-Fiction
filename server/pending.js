import db from "./db.js";

console.table(
  db
    .prepare("SELECT id, text, language, status FROM claims WHERE status = 'pending'")
    .all()
);