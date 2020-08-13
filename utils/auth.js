/**
 * 认证工具
 * @author Aries
 */


var redis = require('./redis');
var log = require('./log');
var { feedback } = require('../utils/feedback');


async function isSignIn(req) {
    try {
        if (req.body.accessToken == req.session.user.accessToken && req.session.user.accessToken == await redis.get('AAT' + req.session.user.account)) {
            return true;
        } else {
            log.ATBlock(req);
            return false;
        }
    } catch (err) {
        log.ATBlock(req);
        return false;
    }
}


async function passport(req, res, next) {
    if (!await isSignIn(req)) return res.send(feedback(14000));
    next();
}


module.exports = {
    isSignIn,
    passport
}