/**
 * Created by quyangcode_air on 13-12-15.
 */
/**
 * 加密工具
 */
var crypto = require('crypto');


//MD5加密方法
exports.toMD5 = function(value){
    try {
        var md5 = crypto.createHash('md5').update(value).digest('hex');
    } catch (e) {
        console.error('MD5加密失败',e);
    }
    return md5;
};

/**
 * DES加密
 * @param str  待加密字符串
 * @param secret 密钥
 * @returns {Progress|*}
 */
exports.encryptDES = function (str,secret) {
    var enc = '';
    try {
        var cipher = crypto.createCipher('des', secret);
        enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
    } catch (e) {
        console.error('DES加密失败',e);
    }
    return enc;
};

/**
 * DES解密
 * @param str
 * @param secret
 * @returns {Progress|*}
 */
exports.decryptDES = function (str,secret) {
    var dec = '';
    try {
        var decipher = crypto.createDecipher('des', secret);
        dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
    } catch (e) {
        console.error('DES解密失败',e);
    }
    return dec;
};

