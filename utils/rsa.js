/**
 * 基于node-rsa模块,操作公钥和私钥.
 * @author Aries
 */


var rsa = require('node-rsa');


module.exports = {


  /**
   * Get public and private key pairs.
   *
   * @param  {Number} modulusBit The length of modulus bit.
   * @return {Object}            Private and public key paris.
   * @author Aries
   */
  getLockAndKey: function (modulusBit = 512) {
    // function rsaEncrypt(message, key) {
    // let clientKey = new NodeRSA(RSA_PUBLIC_KEY)
    // 在node-rsa模块中加解密默认使用 pkcs1_oaep ,而在js中加密解密默认使用的是 pkcs1
    // clientKey.setOptions({encryptionScheme: 'pkcs1'}) //本行代码设置加密
    // let encrypted = clientKey.encrypt(message, 'base64')
    // return encrypted
    // }
    //TODO: 编写异常
    //指数(exponent)默认为65537
    var key = new rsa({
      b: modulusBit
    });
    //生成公钥
    var publicKey = key.exportKey('public');
    //生成私钥
    var privateKey = key.exportKey('private');
    return {
      lock: publicKey,
      key: privateKey
    };
  },


  /**
   * Encode a string with public key.
   *
   * @param  {String} plain     Any type of string that you want to encode.
   * @param  {String} publicKey Public key.
   * @return {String}           Encoded string.
   * @author Aries
   */
  lock: function (plain, publicKey) {
    var lock = new rsa(publicKey);
    return lock.encrypt(plain, 'base64');
  },


  /**
   * Decode a string which was encoded by public key.
   *
   * @param  {String} cipher     Cipher string.
   * @param  {String} privateKey Private key.
   * @return {String}            Decoded string.
   * @author Aries
   */
  unlock: function (cipher, privateKey) {
    var key = new rsa(privateKey);
    return key.decrypt(cipher, 'utf8');
  },


  /**
   * Sign stuff with base64 to generate a signature.
   *
   * @param  {String} plain      Plain text.
   * @param  {String} privateKey Private key.
   * @return {String}            Signature.
   * @author Aries
   */
  //key.sign(buffer, [encoding], [source_encoding])
  sign: function (plain, privateKey) {
    var key = new rsa(privateKey);
    return key.sign(plain, 'base64');
  },


  /**
   * Verify utf8 string with base64 signature.
   *
   * @param  {String} cipher    Cipher text.
   * @param  {String} signature Signature.
   * @param  {String} publicKey Public key.
   * @return {String}           Plain text.
   * @author Aries
   */
  //key.verify(buffer, signature, [source_encoding], [signature_encoding])
  verify: function (cipher, signature, publicKey) {
    var key = new rsa(publicKey);
    return key.verify(cipher, signature, 'utf8', 'base64');
  }


  //解密
  //replace格式不匹配,适用于mysql读取出来的privateKey
  // unlock: function(cipher, privateKey) {
  //   let key = new rsa(privateKey.replace(/\\n/g, '\r\n'));
  //   return key.decrypt(cipher, 'utf8');
  // }

};
