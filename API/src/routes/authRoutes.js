// Importe Express
const express = require('express');

// Importe la validation des champs
const { body } = require('express-validator');

// Importe les fonctions du contrôleur d'authentification
const {
  register,
  login,
  logout
} = require('../controllers/authController');

// Crée le routeur Express
const router = express.Router();

// Route pour l'inscription
router.post(
  '/register',
  [
    body('full_name')
      .trim()
      .notEmpty()
      .withMessage('Le nom complet est obligatoire.'),

    body('email')
      .isEmail()
      .withMessage('Email invalide.')
      .normalizeEmail(),

    body('password')
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères.')
  ],
  register
);

// Route pour la connexion
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Email invalide.')
      .normalizeEmail(),

    body('password')
      .notEmpty()
      .withMessage('Le mot de passe est obligatoire.')
  ],
  login
);

// Route pour la déconnexion
router.post('/logout', logout);

// Exporte le routeur
module.exports = router;