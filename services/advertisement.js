/**
 * 广告服务
 * @author Aries
 */


var { sqlGo } = require('../utils/mysql');
var { feedback } = require('../utils/feedback')
var log = require('../utils/log');


module.exports = {


    getLatestList: async function (req) {
        var { pageIndex = 1, pageSize = 5 } = req.query;
        //@TODO:使用中间件
        pageIndex = Math.floor(pageIndex);
        pageSize = Math.floor(pageSize);
        if (pageIndex < 1 || pageSize < 1 || pageSize > 100) { return feedback(13006); }
        try {
            var ads = await sqlGo(`select * from app_advertisement where is_usable=1 limit ${(pageIndex - 1) * pageSize}, ${pageSize}`);
            var amount = await sqlGo(`select count(id) amount from app_advertisement where is_usable=1`)
            return feedback(10000, { ads, amount: amount[0].amount });
        } catch (err) {
            log.error(req, 12000, err);
            return feedback(12000);
        }
    }


};