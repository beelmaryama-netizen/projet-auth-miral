// Importe Express
const express = require('express');

// Importe le middleware de protection
const requireAuth = require('../middlewares/authMiddleware');

// Importe le contrôleur utilisateur
const { getMe } = require('../controllers/userController');

// Crée le routeur Express
const router = express.Router();

// Route protégée pour récupérer le profil connecté
router.get('/me', requireAuth, getMe);

// Exporte le routeur
module.exports = router;