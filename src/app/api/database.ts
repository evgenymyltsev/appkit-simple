import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "profile.db");

export const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the users database.");
  }
);

export const apiGet = async <T>(query: string): Promise<T[]> => {
  return await new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(rows as T[]);
    });
  });
};

export const apiPost = async (
  query: string,
  values: string[]
): Promise<void> => {
  return await new Promise((resolve, reject) => {
    const queryExistingUser = `
      SELECT * 
      FROM users
      WHERE address = ?
    `;
    db.get(queryExistingUser, values[0], (err, row) => {
      if (err) {
        return reject(err);
      }
      if (row) {
        console.log(`User with address ${values[0]} already exists`);
        return resolve();
      }
      db.run(query, values, function (err) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve();
      });
    });
  });
};
