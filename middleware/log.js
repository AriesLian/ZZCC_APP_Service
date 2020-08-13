/**
 * Log middleware
 * @author Aries
 */


var log = require("../utils/log")


module.exports = {


    incoming: function (req, res, next) {
        // if (req.url.slice(-6) != "signup" && req.url.slice(-6) != "signin")
        log.incoming(req);
        next();
    },


    outgoing: function (req, res, next) {
        log.outgoing(req);
        next();
    }


}