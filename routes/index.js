const router = require('express').Router();
const usersRouter = require('./users');
const mailer = require('../mail');

let mailOptions = {
  to: 'hola@michelletorres.mx',
  subject: 'Hello ✔',
  text: 'Hello world?',
  html: '<b>Hello world?</b>',
};

router.get('/', (req, res) => {
  mailer.sendMail(mailOptions);
  res.send('ExpressJS 101 API');
});

router.use('/users', usersRouter);

module.exports = router;
