const router = require('express').Router();
const { usersCtrl } = require('../controllers');

router.get('/', usersCtrl.getAll);

router.get('/:userId', usersCtrl.get);

router.post('/', usersCtrl.create);

module.exports = router;
