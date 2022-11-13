/* Import des modules necessaires */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });

/* Verification authentification */
//exportation de la fonction du middleware
module.exports = (req, res, next) => {
    try {
//recuperer le token dans le headers authorization : bearer token
        const token = req.headers.authorization.split(" ")[1];
     //decoder le token
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
     //recupere le userid qu'il y a à l'interieur du token dechiffré et le comparer avec l'userId en claire
        const userId = decodedToken.userId;
     //comparaison du userId qu'il y a en clair dans la req avec l'userid qu'il y a dans le token
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
        //si il y a des erreurs dans le try on les recuperes ici
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

/*const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.session.token;  // récupération du jwt dans le cookie de session
        const decodedToken = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            console.log("User ID non valable");
            throw "User ID non valable";  
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
}*/

