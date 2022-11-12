//importation d'express
const express = require('express');

//la fonction Router()
const router = express.Router();

//importation du controllers/user.js
const userCtrl = require('../controllers/user.js');
const validate = require('../middlewares/validate-inputs');

//la route (endpoint) signup
router.post('/signup', validate.user, userCtrl.signup);
router.post('/login', validate.user, userCtrl.login);

module.exports = router;