/**
 * 系统服务
 * @author Aries
 */


var { sqlGo } = require('../utils/mysql');
var { feedback } = require('../utils/feedback')
var log = require('../utils/log');

var { ACCESS_TOKEN_EXPIRE_TIME } = require('../CONFIG.JS').REDIS;
var redis = require('../utils/redis');
var { passwordShield, md5 } = require('../utils/crypto');
var Doorman = require('../utils/rsa');


module.exports = {


  //TODO:根据业务需求,暂时使用web端用户创建密码后分配的方式来创建用户.
  signUp: async function (req) {
    var { account, password } = req.body;
    //@TODO:使用中间件
    if (account.length > 20 || account.length < 6) { return feedback(14013, { account }); }
    if (!password) { return feedback(14014); }
    //@TODO:注意使用网页注册的密码只使用了MD5加密
    var md5=require('md5');
    password=md5(password);
    // password = passwordShield(account, password);
    try {
      await sqlGo(`insert into app_user(account,password) values('${account}','${password}')`);
      return feedback(10000, { account });
    } catch (err) {
      if (err.errno === 1062) return feedback(14005);
      log.error(req, 12000, err)
      return feedback(12000);
    }
  },


  signIn: async function (req) {
    var { account, password } = req.body;
    //@TODO:使用中间件
    if (account.length > 20 || account.length < 6) { return feedback(14013, { account }); }
    if (!password) { return feedback(14014); }
    //@TODO:注意使用网页注册的密码只使用了MD5加密
    var md5=require('md5');
    password=md5(password);
    // password = passwordShield(account, password);
    try {
      var user = await sqlGo(`select * from app_user where account='${account}' and password='${password}' limit 1`);
      if (user.length === 0) return feedback(14001);
      var { id, account } = user[0];
      var accessToken = md5(id + account + new Date())
      //AAT: Means application access token
      redis.set('AAT' + account, accessToken, ACCESS_TOKEN_EXPIRE_TIME);
      req.session.user = { id: id, account: account, accessToken: accessToken };
      return feedback(10000, { account, accessToken, expireIn: ACCESS_TOKEN_EXPIRE_TIME });
    } catch (err) {
      log.error(req, 12000, err)
      return feedback(12000);
    }
  },


  signOff: async function (req) {
    try {
      redis.del('AAT' + req.session.user.account);
    }
    catch (err) {
      log.error(req, 12000, err);
      return feedback(12000);
    }
    req.session.destroy();
    return feedback(10000);
  },


  getPublicKey: async function (req) {
    var { lock, key } = Doorman.getLockAndKey();
    //APK means application public key
    let id = Date.now();
    redis.set('APK' + id, key, 60);
    return feedback(10000, { id, publicKey: lock, expireIn: 60 });
  }


};