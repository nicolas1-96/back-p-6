//importation de mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//le modele de base de donnée pour le signup (pour enregistrer un nouvel utilisteur)
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model('User', userSchema);