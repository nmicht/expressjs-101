const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const usersRouter = require('./users');
const { auth } = require('../middlewares');

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

// This is just a test for authentication
router.get('/', auth.haveSession, (req, res) => {
  res.send('ExpressJS 101 API');
});

// This is just a testing route for uploading files
router.post('/test', upload.single('picture'), (req, res, next) => {
  // Here in theory you already validated everything and you are ready to move the file to a 'final' path
  fs.rename(req.file.path, `uploads/${req.file.filename}`, (err) => {
    if (err) {
      throw err;
    }
  });
  next();
}, (req, res) => {
  res.send('testing upload');
});

router.use('/users', usersRouter);

module.exports = router;
