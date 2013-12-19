/**
 * Created by quyangcode_air on 13-12-15.
 */

/**
 * 用户相关业务操作
 *
 */
var MD5Utils = require('./util/MD5Utils.js');
var User = require('../models/User.js');
var Code = require('../config/Code.js');
var SystemConstant = require('../config/SystemConstant.js');

/**
 * 注册
 * @param req
 * @param res
 */
exports.register = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var password2 = req.body.password2;
    if (!name || !password) {
        return res.send({status:Code.PARAMETER_ERROR});
    }
    //检验用户两次输入的密码是否一致
    if (password2 != password) {
        return res.send({status:Code.PASSWORD_AGAIN_ERROR});
    }
    //生成密码的散列值
    password = MD5Utils.toMD5(password);
    var newUser = new User({
        name: name,
        password: password,
        picAddress: SystemConstant.PIC_ADDRESS
    });
    newUser.save(function(err,rows){
        if(err){
            console.error('注册失败' + e);
            return res.send({status:Code.REGISTER_ERROR});
        }
        return res.send({status:Code.SUCCESS});
    });
};
/**
 * 根据id查询user
 * @param id
 */
exports.getUserById = function(id){
    User.getUserById(id,function(err,users){
        if(err || !users){
            console.error('根据ID查询user失败'+ err);
            return null;
        }
        return users[0];
    });
};

/**
 * 根据name查询user
 * @param name
 */
exports.getUserByName = function(name,callback){
    User.getUserByName(name,function(err,users){
        if(err || users){
            return callback(null);
        }
        return callback(users[0]);
    });
};
/**
 * 用户名是否存在
 * @param req
 * @param res
 */
exports.isUserNameExist = function(req,res){
    var name = req.params.userName;
    User.getUserByName(name,function(err,users){
        if(err || users){
            return res.send({status:Code.USER_IS_EXIST});
        }
        return res.send({status:Code.SUCCESS});
    });
};

/**
 * 登录
 * @param req
 * @param res
 */
exports.login = function (req, res) {
    var name = req.params.name;
    var password = req.params.password;
    if(!name || !password){
        return res.send({status:Code.PARAMETER_ERROR});
    }
    //生成密码的散列值
    password = MD5Utils.toMD5(password);
    //检查用户是否存在
    User.login(name, password, function (err, num) {
        if(num === 1){
            res.send({status:Code.SUCCESS});
        }else{
            res.send({status:Code.USERNAME_PASSWORD_ERROR});
        }
    });
};










