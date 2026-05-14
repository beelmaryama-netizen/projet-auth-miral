// Middleware global pour gérer les erreurs de l'application
const errorMiddleware = (err, req, res, next) => {
  console.error('Erreur:', err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur interne du serveur'
  });
};

// Exporte le middleware
module.exports = errorMiddleware;