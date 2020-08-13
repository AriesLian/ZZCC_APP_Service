/**
 * 用户管理
 * @author Aries
 */


var express = require('express');
var router = express.Router();
var passport = require('../utils/auth').passport;
var userService = require('../services/user');


router.get('/', function (req, res) {
  res.send('respond with user list');
});


router.put('/me', passport, async function (req, res) {
  res.send(await userService.editMyself(req));
});


module.exports = router;
