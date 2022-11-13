/* Import des modules necessaires */
//importation models de la base de donnée user.js
const User = require("../models/user");
//importation de bcrypt
const bcrypt = require("bcrypt");
//importation de jsonwebtoken
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
            // sauvegarde le user dans la base de donnée
            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                // si erreur au hashage status 400 Bad Request et message en json
                .catch((error) => res.status(400).json({ error }));
        })
        // au cas d'une erreur status 500 Internal Server Error et message en json
        .catch((error) => res.status(500).json({ error }));
};

/* Controleur login */
// l'identification d'utilisateur grace a login
exports.login = (req, res, next) => {
    // cherche dans la basse de donnée si l'utilisateur est bien present avec findOne
    User.findOne({ email: req.body.email })
    // pour un utilisateur
        .then((user) => {
            // si la requete email ne correspond pas à un utisateur 
            if (!user) {
                // status 401 Utilisateur non trouvé
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            
             // si c'est ok bcrypt compare le mot de l'utilisateur envoyer par le front avec celui rentré par l'utilisateur dans sa request
            bcrypt
                .compare(req.body.password, user.password)
                // à la validation
                .then((valid) => {
                    //si le mot de passe est incorrect
                    if (!valid) {
                        // retourne un status 401 Mot de passe incorrect
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    // si c'est ok status 201 envoie dans la response du serveur du userId et du token d'authentification
                    res.status(200).json({
                        //encodage du userId pour la creation de nouveau objet (objet et userId seront liés)
                         // renvoi l'user id
                        userId: user._id,
                         // renvoi un token traité/encodé
                        token: jwt.sign(
                            //3 arguments
                            // le token aura le user id identique à la requete d'authentification
                            { userId: user._id }, 
                            // clef secrette pour l'encodage
                            `${process.env.TOKEN_KEY}`, {
                            // Connexion valide = token 1H
                            expiresIn: "1h",
                        }),
                    });
                })
                // erreur status 500 Internal Server Error et message en json
                .catch((error) => res.status(500).json({ error }));
        })
        // erreur status 500 Internal Server Error et message en json
        .catch((error) => res.status(500).json({ error }));
};
