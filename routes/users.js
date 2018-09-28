const router = require('express').Router();
const { usersCtrl } = require('../controllers');
const middlewares = require('../middlewares');

router.get('/', usersCtrl.getAll);
router.get('/:userId', usersCtrl.get);
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      email: 'email,required',
      unwanted: 'required',
    },
  });
}, usersCtrl.create);
router.delete('/:userId', usersCtrl.delete);

module.exports = router;
