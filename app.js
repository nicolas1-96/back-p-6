//importation de express
const express = require('express');
//importation de body-Parser
const bodyParser = require('body-parser');
//importation de mongosse pour c'est connecter a la base de donnée mongoDB
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
//importation morgan (logger http)
const morgan = require('morgan');
// importation de helmet, il est utilisé pour sécuriser vos en-têtes
const helmet = require('helmet');
// importation de dotenv qui stocke des variables d'environnement et ça servira pour l'appel mongodb en dessous.
require('dotenv').config();
const session = require('express-session');
//importation morgan (logger http)

// Lancement de Express pour créer une aplication express
const app = express();

//logger les requests et les reponse 
app.use(morgan("dev"));

//importation des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USER }:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error));




/**
 * MIDDLEWARES
 */
// Configuration cors, gerer les problemes de CORS(Cross-Origin-Request-Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.AUTHORIZED_ORIGIN );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// transformer le CORPS (le body) en json objet javascript utilisable
app.use(bodyParser.json());

// Sécurise les headers
app.use(helmet());


/**
 * ROUTES
 */
app.use('/images', express.static(path.join(__dirname, 'images')));
//la route des sauces
app.use('/api/sauces', sauceRoutes);
//la route d'authentification 
app.use('/api/auth', userRoutes);


//exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;