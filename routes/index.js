/**
 * 核心功能
 * @author Aries
 */


var express = require('express');
var router = express.Router();
var passport = require('../utils/auth').passport;
var indexService = require('../services/index');


router.get('/', function (req, res) {
  res.render('index', { title: 'App Server' });
});


//前端先使用MD5简单加密密码.
router.post('/signUp', async function (req, res) {
  // userService.createUser(req).then(val=>{res.send(val);}).catch(err=>{res.send(err);})
  res.send(await indexService.signUp(req));
});


router.post('/signIn', async function (req, res) {
  res.send(await indexService.signIn(req));
});


router.post('/signOff', passport, async function (req, res) {
  res.send(await indexService.signOff(req));
});


//获取加密公钥
router.get('/publicKey', passport, async function (req, res) {
  res.send(await indexService.getPublicKey(req));
});


module.exports = router;