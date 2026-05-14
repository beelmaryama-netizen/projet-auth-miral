const { findUserById } = require('../models/userModel');

const getMyProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error('Utilisateur introuvable.');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

module.exports = {
  getMyProfile
};