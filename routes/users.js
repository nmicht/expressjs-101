const router = require('express').Router();
const { usersCtrl } = require('../controllers');

router.get('/', usersCtrl.getAll);
router.get('/:userId', usersCtrl.get);
router.post('/', usersCtrl.create);
router.delete('/:userId', usersCtrl.delete);

module.exports = router;
