const tableUserQuery = `
    CREATE TABLE IF NOT EXISTS user (
      uid TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL UNIQUE,
      displayName TEXT,
      emailVerified TEXT,
      photoURL TEXT,
      username TEXT UNIQUE,
      phoneNumber TEXT,
      createdAt TEXT,
      sync INTEGER
    );
`;
const tableItemQuery = `
    CREATE TABLE IF NOT EXISTS item (
      uid TEXT PRIMARY KEY NOT NULL,
      TITLE TEXT NOT NULL,
      DESCRIPTION TEXT,
      createdAt TEXT,
      sync INTEGER
    );
`;
const tableItemImageQuery = `
    CREATE TABLE IF NOT EXISTS item_image (
      uid TEXT PRIMARY KEY NOT NULL,
      image TEXT NOT NULL,
      itemUid TEXT NOT NULL,
      createdAt TEXT,
      sync INTEGER,
      FOREIGN KEY(itemUid) REFERENCES item(uid)
      
    );
`;

export {
    tableUserQuery,
    tableItemQuery,
    tableItemImageQuery
}