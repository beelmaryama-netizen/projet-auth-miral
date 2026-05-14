// Importe la gestion des erreurs de validation
const { validationResult } = require('express-validator');

// Importe les services d'authentification
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../services/authService');

// Vérifie s'il y a des erreurs de validation
const handleValidationErrors = (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    throw error;
  }
};

// Contrôleur d'inscription
const register = async (req, res, next) => {
  try {
    handleValidationErrors(req);

    const { email, password, full_name } = req.body;

    const result = await registerUser({ email, password, full_name });

    res.status(201).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

// Contrôleur de connexion
const login = async (req, res, next) => {
  try {
    handleValidationErrors(req);

    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

// Contrôleur de déconnexion
const logout = async (req, res, next) => {
  try {
    const result = await logoutUser();

    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

// Exporte les contrôleurs
module.exports = {
  register,
  login,
  logout
};