import { db } from "./database";

export const migrate = () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("users table created successfully.");
        }
      }
    );
  });
};

migrate();
