const router = require('express').Router();
const usersRouter = require('./users');

router.get('/', (req, res) => {
  res.send('ExpressJS 101 API');
});

router.use('/users', usersRouter);

module.exports = router;
