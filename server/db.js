import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

const db = new Database(fileURLToPath(new URL("./claims.db", import.meta.url)));

db.exec(`
  CREATE TABLE IF NOT EXISTS claims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    verdict TEXT CHECK (verdict IN ('fact', 'fiction')),
    explanation TEXT,
    source TEXT,
    source_url TEXT,
    status TEXT NOT NULL DEFAULT 'verified' CHECK (status IN ('verified', 'pending')),
    language TEXT NOT NULL DEFAULT 'en'
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS claim_translations (
    claim_id INTEGER NOT NULL REFERENCES claims(id),
    language TEXT NOT NULL,
    text TEXT NOT NULL,
    explanation TEXT NOT NULL,
    reviewed INTEGER NOT NULL DEFAULT 0 CHECK (reviewed IN (0, 1)),
    PRIMARY KEY (claim_id, language)
  )
`);

export default db;