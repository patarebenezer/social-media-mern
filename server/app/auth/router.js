var express = require('express');
const { index, signup } = require('./controller');
var router = express.Router();

/* GET users listing. */
router.post('/signin', index);
router.post('/signup', signup);
module.exports = router;
