import path from 'path';
import os from 'os';

let dbInstance = null;

export async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  if (process.env.VERCEL) {
    // Vercel Serverless environment: use a pure JS mock DB to prevent sqlite3 native binding crashes
    dbInstance = {
      get: async () => null,
      run: async () => ({ lastID: Math.floor(Math.random() * 1000) }),
      exec: async () => {}
    };
    return dbInstance;
  }

  // Local development: dynamically import sqlite3 so Vercel doesn't crash on module load
  const sqlite3 = (await import('sqlite3')).default;
  const { open } = await import('sqlite');

  const dbPath = path.join(os.tmpdir(), 'database.sqlite');
  
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
