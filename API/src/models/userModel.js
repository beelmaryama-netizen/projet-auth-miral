// Importe la connexion MySQL
const pool = require('../config/db');

// Crée un nouvel utilisateur
const createUser = async ({ email, password_hash, full_name }) => {
  const [result] = await pool.execute(
    `INSERT INTO users (email, password_hash, full_name)
     VALUES (?, ?, ?)`,
    [email, password_hash, full_name]
  );

  return result.insertId;
};

// Cherche un utilisateur par email
const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email]
  );

  return rows[0];
};

// Cherche un utilisateur par id
const findUserById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT id, email, full_name, created_at
     FROM users
     WHERE id = ? LIMIT 1`,
    [id]
  );

  return rows[0];
};

// Exporte les fonctions
module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};