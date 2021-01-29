var express = require('express');
var router = express.Router();

let user = require('../controllers/user')

router.get('/Login', user.Login)
router.post('/SignUp', user.SignUp)

module.exports = router;
