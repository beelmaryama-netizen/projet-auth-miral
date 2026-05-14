// Charge les variables d'environnement
require('dotenv').config();

// Importe les modules nécessaires
const express = require('express');
const cors = require('cors');

// Importe les routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Importe le middleware d'erreur
const errorMiddleware = require('./middlewares/errorMiddleware');

// Crée l'application Express
const app = express();

// Active CORS
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Permet de lire le JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API auth mobile en marche' });
});

// Routes principales
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Middleware d'erreur à la fin
app.use(errorMiddleware);

// Exporte l'application
module.exports = app;