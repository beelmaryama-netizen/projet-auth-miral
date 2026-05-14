// Importe le service utilisateur
const { getMyProfile } = require('../services/userService');

// Contrôleur pour récupérer le profil de l'utilisateur connecté
const getMe = async (req, res, next) => {
  try {
    const user = await getMyProfile(req.user.id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Exporte le contrôleur
module.exports = {
  getMe
};