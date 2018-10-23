const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const { usersCtrl } = require('../controllers');
const { Validator, auth } = require('../middlewares');

// Define the path and name for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.')[1];
    cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

// Initialize multer
const upload = multer({ storage });

router.get('/', usersCtrl.getAll);

// Ejemplo de ruta que requiere tener sesión
router.get('/:userId', auth.haveSession, usersCtrl.get);

// Ejemplo de ruta con carga de archivos
router.post('/', upload.single('picture'), (req, res, next) => {
  console.log(req.file);
  Validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      email: 'email,required',
      unwanted: 'required',
    },
    file: {
      filename: 'required',
    },
  });
}, (req, res, next) => {
  fs.rename(req.file.path, `uploads/${req.file.filename}`, (err) => {
    if (err) {
      throw err;
    }
  });
  next();
}, usersCtrl.create);

router.delete('/:userId', usersCtrl.delete);

module.exports = router;
