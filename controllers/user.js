/* Import des modules necessaires */
//importation models de la base de donnée user.js
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

/* Controleur inscription */
//signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
    // Hashage du mot de passe utilisateur
    bcrypt
        .hash(req.body.password,10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            // Creation de l'utilisateur
            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/* Controleur login */
exports.login = (req, res, next) => {
    // cherche dans la basse de donnée si l'utilisateur est bien present avec findOne
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            // controler la validité du mot de passe de l'utilisateur envoyer par le front
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    //si le mot de passe est incorrect
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    // envoie dans la response du serveur du userId et du token d'authentification
                    res.status(200).json({
                        //encodage du userId pour la creation de nouveau objet (objet et userId seront liés)
                        userId: user._id,
                        token: jwt.sign(
                            //3 arguments
                            { userId: user._id }, 
                            `${process.env.TOKEN_KEY}`, {
                            // Connexion valide = token 1H
                            expiresIn: "1h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
