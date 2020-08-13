/**
 * 加密工具
 * @author Aries
 */


var crypto = require('crypto');


function sha256(str) {
    return crypto.createHash('SHA256').update(str).digest('hex');
}


function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}


//Encrypt password without storing salt.
//Noting that the account can't be changed.
function passwordShield(account, password) {
    let salt = md5(account) + md5(password);
    return sha256(password + salt);
}


function aes128Encode(data, key, iv) {
    let decipher = crypto.createCipheriv('aes-128-cbc', key,iv);
    return decipher.update(data, 'binary', 'base64') + decipher.final('base64');
}


function aes128Decode(data, key,iv) {
    data = new Buffer.from(data, 'base64').toString('binary');
    let decipher = crypto.createDecipheriv('aes-128-cbc', key,iv);
    return decipher.update(data, 'binary', 'utf8') + decipher.final('utf8');
}


module.exports = {
    sha256,
    md5,
    passwordShield,
    aes128Encode,
    aes128Decode
}