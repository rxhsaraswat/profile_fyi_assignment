import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database
    })
  }
  return db
}

export async function initDb() {
  const db = await getDb()
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id TEXT,
      quantity INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
}
