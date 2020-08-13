/**
 * 用户相关服务
 * @author Aries
 */


var { sqlGo } = require('../utils/mysql');
var { feedback } = require('../utils/feedback')
var log = require('../utils/log');

var { passwordShield } = require('../utils/crypto');


module.exports = {


    editMyself: async function (req) {
        try {
            let password = req.body.password;
            let { id, account } = req.session.user;
            password = passwordShield(account, password);
            let info = await sqlGo(`UPDATE app_user SET password='${password}' WHERE id=${id}`);
            if (info.affectedRows == 1) {
                return feedback(10000);
            } else {
                return feedback(14004);
            }
        } catch (error) {
            log.error(req, 11000, error);
            return feedback(11000);
        }
    }


};