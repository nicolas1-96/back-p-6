//importation de mongoose
const mongoose = require('mongoose');
//importation mongoose-unique-validateur
const uniqueValidator = require('mongoose-unique-validator');

//le modele de base de donnée pour le signup (pour enregistrer un nouvel utilisteur)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//sécurité conseillé pour ne pas enregistrer 2 fois la même adresse email dans la base de donnée
userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model('User', userSchema);