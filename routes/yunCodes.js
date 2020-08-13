/**
 * 云码操作
 * @author Aries
 */


var express = require('express');
var router = express.Router();
var passport = require('../utils/auth').passport;
var yunCodeService = require('../services/yunCode');


router.get('/', function (req, res) {
  res.send('respond with yunCode list');
});


module.exports = router;
