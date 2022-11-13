//multer: pour gerer les requete HTTP avec envoie de fichier

//importation multer
const multer = require('multer');

// les dictionnaire de MIME TYPE
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//la destination du fichier (repertoire) et generer un nom de fichier inique
const storage = multer.diskStorage({
    //la destination du stockage du fichier
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //supprimer les espaces dans le nom du fichier
        const name = file.originalname.split('.')[0].split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + '_' + Date.now() + '.' + extension);
    }
})
//exportation du module middleware multer
module.exports = multer({ storage }).single('image');