import connection from "../databases/postgres.js";

async function createUser(name, email, passwordHash, image) {
  return connection.query(
    `INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4);`,
    [name, email, passwordHash, image]
  );
}

async function searchUser(email) {
  return connection.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export const authRepository = {
  createUser,
  searchUser,
};
