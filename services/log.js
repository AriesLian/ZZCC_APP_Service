/**
 * 业务日志服务
 * @author Aries
 */


var { sqlGo } = require('../utils/mysql');
var { feedback } = require('../utils/feedback')
var log = require('../utils/log');

var redis = require('../utils/redis');
var Doorman = require('../utils/rsa');
var aes128Decode = require('../utils/crypto').aes128Decode;

module.exports = {


  getYunCodeQueryLogsByCipherYunCode: async function (req) {
    // //TEST:
    // let key = await sqlGo(`SELECT private_key FROM key_pairs WHERE id=38`);
    // key = key[0].private_key;
    // let yunCode = Doorman.unlock('McHY15br+jQDoa205SHAbJwGW3c00KsROCJxg8fz1MT9A1ydY4p8MkJWgQdiIEyDeqlzZ9KBYbf5MZRUhJq2Kw==', key);
    // let queryLogs = await sqlGo(`SELECT*FROM yuncodequerylogs WHERE CODE='${yunCode}' ORDER BY cTime DESC`);
    // return feedback(10000, { queryLogs });
    try {
      let cipherYunCode = req.params.cipherYunCode;
      //TODO:检验参数
      let { tempLockId, lockMethod, lockId, longitude = '', latitude = '', location = '', clientIp = '' } = req.body;
      let tempKey = await redis.get('APK' + tempLockId);
      let lockedYunCode = Doorman.unlock(cipherYunCode, tempKey);
      let key;
      let yunCode;
      if (lockMethod == "r") {
        key = await sqlGo(`SELECT private_key FROM key_pairs WHERE id=${lockId}`);
        key = key[0].private_key;
        yunCode = Doorman.unlock(lockedYunCode, key);
      }
      else {
        key = await sqlGo(`SELECT key,iv FROM keys WHERE id=${lockId}`);
        key = key[0].key;
        let iv = key[0].iv;
        yunCode = aes128Decode(lockedYunCode, key, iv);
      }
      let queryLogs = await sqlGo(`SELECT*FROM yuncodequerylogs WHERE CODE='${yunCode}' ORDER BY cTime DESC`);
      //插入本次查询
      await sqlGo(`INSERT INTO yuncodequerylogs (code,longitude,latitude,location,clientIp,queryresult,cTime) VALUES 
                  ('${yunCode}','${longitude}','${location}','${latitude}','${clientIp}','通过app扫码查询',CURRENT_DATE)`);
      return feedback(10000, { queryLogs });
    } catch (err) {
      return feedback(13008);
    }
  }


};
