/**
 * 广告
 * @author Aries
 */


var express = require('express');
var router = express.Router();
var passport = require('../utils/auth').passport;
var adService = require('../services/advertisement');


router.get('/', passport, async function (req, res) {
  res.send(await adService.getLatestList(req));
});


module.exports = router;
