/**
 * 系统日志工具
 * @author Aries
 */


var { MESSAGE, LOG } = require('../CONFIG.JS');
var account = 'UNKNOW';
var temp_psw;


module.exports = {


  getIncomingAddress: function (req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  },


  incoming: function (req) {
    if (LOG.LEVEL === 4) {
      try { account = req.session.user.account } catch (err) { }
      if (req.body.password) { temp_psw = req.body.password; req.body.password = '******'; }
      console.log("REQUEST: [" + req.method + "] [" + this.getIncomingAddress(req) + "] " + "[" + req.url + "] by [" +
        account + "] at [" + new Date() + "], request body is: [" + JSON.stringify(req.body) + "].");
      if (req.body.password) { req.body.password = temp_psw; }
    }
  },


  outgoing: function (req, code, result) {
    if (LOG.LEVEL === 4) {
      try { account = req.session.user.account } catch (err) { }
      if (req.body.password) { temp_psw = req.body.password; req.body.password = '******'; }
      console.log("RESPONSE: [" + code + "] [" + MESSAGE[code] + "] [" + req.method + "] [" + this.getIncomingAddress(req) + "] " + "[" + req.url + "] by [" +
        account + "] at [" + new Date() + "], request body is: [" + JSON.stringify(req.body) + "], response content: [" + result + "].");
      if (req.body.password) { req.body.password = temp_psw; }
    }
  },


  info: function (req, code, info) {
    if (LOG.LEVEL >= 3) {
      try { account = req.session.user.account } catch (err) { }
      if (req.body.password) { temp_psw = req.body.password; req.body.password = '******'; }
      console.info("INFO: [" + code + "] [" + MESSAGE[code] + "] [" + req.method + "] [" + this.getIncomingAddress(req) + "] " + "[" + req.url + "] by [" +
        account + "] at [" + new Date() + "], request body is: [" + JSON.stringify(req.body) + "], Interrupted content: [" + info + "].");
      if (req.body.password) { req.body.password = temp_psw; }
    }
  },


  ATBlock: function (req) {
    if (LOG.LEVEL >= 2) {
      try { account = req.session.user.account } catch (err) { }
      if (req.body.password) { temp_psw = req.body.password; req.body.password = '******'; }
      console.warn("WARNING: [" + this.getIncomingAddress(req) + "] is requiring without or with wrong access_token at [" + new Date() + "] by [" +
        req.method + "] [" + req.url + "] [" + JSON.stringify(req.body) + "], forbade.");
      if (req.body.password) { req.body.password = temp_psw; }
    }
  },


  error: function (req, code, err) {
    if (LOG.LEVEL >= 1) {
      try { account = req.session.user.account } catch (err) { }
      if (req.body.password) { temp_psw = req.body.password; req.body.password = '******'; }
      console.error("ERROR: [" + code + "] [" + MESSAGE[code] + "] [" + req.method + "] [" + this.getIncomingAddress(req) + "] " + "[" + req.url + "] by [" +
        account + "] at [" + new Date() + "], request body is: [" + JSON.stringify(req.body) + "], Error content: [" + err + "].");
      if (req.body.password) { req.body.password = temp_psw; }
    }
  }


};
