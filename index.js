const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.rootes');
const app = express();

// Charger les variables d'environnement
require('dotenv').config();

// Récupérer les informations de connexion en fonction de l'environnement
const dbURI = process.env.STATUS === 'prod'
  ? process.env.DB_CONNECTION_PROD
  : process.env.DB_CONNECTION_DEV;

// Connexion à MongoDB
// const dbURI = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Le reste de votre configuration Express et de vos routes...

app.use('/user', userRoutes);

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
