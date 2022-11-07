/* Import des modules necessaires */
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });

/* Verification authentification */
module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token,"secret");
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
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

