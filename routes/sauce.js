//importation de express
const express = require('express');
//la fontion router()
const router = express.Router();

//importations du controllers/sauce.js la logique des routes
const sauceCtrl = require('../controllers/sauce');
// importation du middleware authentification qui protège les routes
const auth = require('../middlewares/auth');
// on importer multer pour ajout d'image
const multer = require('../middlewares/multer-config');

const validate = require('../middlewares/validate-inputs');

//les routes
router.get('/',auth, sauceCtrl.getAllSauce);
router.get('/:id',auth, validate.id, sauceCtrl.getOneSauce);
router.post('/',auth, multer, validate.sauce, sauceCtrl.createSauce);
router.put('/:id',auth, multer, validate.id, validate.sauce, sauceCtrl.modifySauce);
router.delete('/:id',auth, validate.id, sauceCtrl.deleteSauce);
router.post('/:id/like',auth, validate.id, validate.like, sauceCtrl.likeSauce);

//exportation du module
module.exports = router;