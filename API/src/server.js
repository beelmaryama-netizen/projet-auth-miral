require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion MySQL réussie');
    connection.release();

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à MySQL :', error.message);
    process.exit(1);
  }
};

startServer();