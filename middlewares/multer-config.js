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
// on exporte le fichier via multer qui possede l'objet storage puis .single signifie fichier unique (pas un groupe de fichiers) en disant que c'est un fichier 'image'
// ce nom de fichier sera la key dans form-data de postman (insert File)
module.exports = multer({ storage }).single('image');