#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  message_text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (message_text, username, added) VALUES
  ('Hello, world! This is Alice checking in.', 'Alice', '2025-08-01T09:00:00Z'),
  ('Just testing my new message board.', 'Bob', '2025-08-02T14:30:00Z'),
  ('Good morning from Chrome. Loving Express + Postgres!', 'Charlie', '2025-08-03T07:45:00Z'),
  ('Express + Postgres is awesome!', 'DevUser', '2025-08-04T18:15:00Z'),
  ('This is seeded data for testing purposes.', 'Seeder', '2025-08-05T12:00:00Z');
`;

async function main() {
  console.log("seeding...");

  const connectionString =
    process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error(
      "Error: must provide a DATABASE_URL via env or as the first argument"
    );
    process.exit(1);
  }

  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query(SQL);
    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seeding failed:", err.stack);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

main();
