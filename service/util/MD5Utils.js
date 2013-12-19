/**
 * Created by quyangcode_air on 13-12-15.
 */
/**
 * MD5加密工具
 */
var crypto = require('crypto');


//MD5加密方法 同步方法
exports.toMD5 = function(value){
    return crypto.createHash('md5').update(value).digest('hex');
};

