// importer le packge HTTP de node.js pour avoir les outils pour crée le serveur
const http = require('http');

//importer l'application app.js
const app = require('./app');

//importer le packge pour utiliser le variable d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//parametrage du port avec methode set de express
app.set("port", process.env.PORT || 3000);

const server = http.createServer(app);

//le serveur ecoute les requetes sur le port
server.listen(process.env.PORT);