/**
 * 日志操作
 * @author Aries
 */


var express = require('express');
var router = express.Router();
var passport = require('../utils/auth').passport;
var logService = require('../services/log');


router.get('/', function (req, res) {
  res.send('respond with log list');
});


//获取云码查询次数及列表
router.get('/yunCodes/:yunCode', async function (req, res) {
  res.send(await logService.getYunCodeQueryLogsByCipherYunCode(req));
});


module.exports = router;
