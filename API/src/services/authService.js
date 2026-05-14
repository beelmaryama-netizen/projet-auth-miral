const bcrypt = require('bcryptjs');
const {
  createUser,
  findUserByEmail
} = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const registerUser = async ({ email, password, full_name }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error('Cet email est déjà utilisé.');
    error.statusCode = 400;
    throw error;
  }

  const password_hash = await bcrypt.hash(password, 10);

  const userId = await createUser({
    email,
    password_hash,
    full_name
  });

  const token = generateToken({
    id: userId,
    email
  });

  return {
    message: 'Inscription réussie.',
    token,
    user: {
      id: userId,
      email,
      full_name
    }
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error('Email ou mot de passe invalide.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    const error = new Error('Email ou mot de passe invalide.');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return {
    message: 'Connexion réussie.',
    token,
    user: {
      id: user.id,
      email: user.email,
      full_name: user.full_name
    }
  };
};

const logoutUser = async () => {
  return {
    message: 'Déconnexion réussie côté client.'
  };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};