const router = require('express').Router();
const usersRouter = require('./users');
const { auth } = require('../middlewares');

// This is just a test for authentication
router.get('/', (req, res, next) => {
  auth.haveSession(req, res, next);
  res.send('ExpressJS 101 API');
});

router.use('/users', usersRouter);

module.exports = router;
