/**
 * 基于jsonwebtoken的token工具
 * @author Aries
 */


var jwt = require('jsonwebtoken');
var JWT = require('../CONFIG.JS').JWT;


module.exports = {


  //TODO:注意处理三个Error
  // JsonWebTokenError: [Function: JsonWebTokenError]
  // NotBeforeError: [Function: NotBeforeError]
  // TokenExpiredError: [Function: TokenExpiredError]


  /**
   * @param  {String} plain Content that you will encode.
   * @param  {String} secretKey  Encode password.
   * @return {String}       Encoded string.
   * @author Aries
   */
  sign: function (plain, secretKey = JWT.SECRET_KEY) {
    return jwt.sign(plain, secretKey);
  },


  /**
   * @param  {String} cipher Content that you will decode.
   * @param  {String} secretKey   Decode password.
   * @return {String}        Decoded string.
   * @author Aries
   */
  verify: function (cipher, secretKey = JWT.SECRET_KEY) {
    return jwt.verify(cipher, secretKey);
  },


  /**
   * @param  {String} cipher Content that you will decode.
   * @param  {String} secretKey   Decode password.
   * @return {String}        Decoded string.
   * @author Aries
   */
  decode: function (cipher, secretKey = JWT.SECRET_KEY) {
    return jwt.decode(cipher, secretKey);
  }


};
