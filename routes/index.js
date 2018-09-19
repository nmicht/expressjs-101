const router = require('express').Router();

router.get('/', (req, res) => res.send('ExpressJS 101 API'));

// Load all the routes available under routes folder
const folder = './routes';
const fs = require('fs');

fs.readdirSync(folder).forEach((file) => {
  const fileName = file.split('.')[0];
  if (fileName !== 'index') {
    router.use(`/${fileName}`, require(`./${fileName}`));
  }
});

module.exports = router;
