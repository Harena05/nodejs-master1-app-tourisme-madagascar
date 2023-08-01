const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "123456",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);

// Charger les variables d'environnement
require('dotenv').config();

// Récupérer les informations de connexion en fonction de l'environnement
const dbURI = process.env.STATUS === 'prod'
  ? process.env.DB_CONNECTION_PROD
  : process.env.DB_CONNECTION_DEV;

  const db = require("./app/models");
  const Role = db.role;
// Connexion à MongoDB
// const dbURI = `mongodb://${dbUser}:${dbPass}@${dbHost}/${dbName}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    initial();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Le reste de votre configuration Express et de vos routes...

app.use('/user', userRoutes);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});


