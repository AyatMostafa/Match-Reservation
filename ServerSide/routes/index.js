var express = require('express');
var router = express.Router();

let user = require('../controllers/user')

router.post('/Login', user.Login)
router.post('/SignUp', user.SignUp)
router.get('/nonAdminUsers', user.fetchNonAdminUsers);
router.put('/users/ApproveUser/:username', user.ApproveUser);
router.delete('/users/DeleteUser/:username', user.DeleteUser);


module.exports = router;
