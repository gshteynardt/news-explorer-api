const router = require('express').Router();

const {
  getUser,
} = require('../controllers/users');

const { idUserValidation } = require('../middlewares/validation');

router.get('/users/me', idUserValidation, getUser);

module.exports = router;
