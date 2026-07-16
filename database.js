import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import os from 'os';

// Define DB path in /tmp for Vercel Serverless to prevent read-only crash
const dbPath = path.join(os.tmpdir(), 'database.sqlite');

let dbInstance = null;

export async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create users table if it doesn't exist
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return dbInstance;
}
