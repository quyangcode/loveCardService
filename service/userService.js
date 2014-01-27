/**
 * Created by quyangcode_air on 13-12-15.
 */

/**
 * 用户相关业务操作
 *
 */
var EncryptUtils = require('./util/EncryptUtils.js');
var User = require('../models/User.js');
var Code = require('../config/Code.js');
var SystemConstant = require('../config/SystemConstant.js');
var MessageType = require('../config/MessageType.js');
var Relationship = require('../models/Relationship.js');
var Message = require('../models/Message.js');
var Querystring = require('querystring');

/**
 * 注册
 * @param req
 * @param res
 */
exports.register = function (req, res) {
    var name = req.params.name;
    var password = req.params.password;
    if (!name || !password) {
        return res.send(JSON.stringify({status:Code.PARAMETER_ERROR}));
    }
    //生成密码的散列值
    password = EncryptUtils.toMD5(password);
    var newUser = new User({
        name: name,
        password: password,
        picAddress: SystemConstant.PIC_ADDRESS
    });
    User.save(newUser,function(err,rows){
        if(err){
            console.error('注册失败' + err);
            return res.send(JSON.stringify({status:Code.REGISTER_ERROR}));
        }
        return res.send(JSON.stringify({status:Code.SUCCESS}));
    });
};


/**
 * 根据name查询user
 * @param name
 */
function getUserByName(name,callback){
    User.getUserByName(name,function(err,users){
        if(err){
            console.error(err);
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
    var name = req.params.name;
    User.getUserByName(name,function(err,users){
        if(err || users){
            return res.send(JSON.stringify({status:Code.USER_IS_EXIST}));
        }
        return res.send(JSON.stringify({status:Code.SUCCESS}));
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
        return res.send(JSON.stringify({status:Code.PARAMETER_ERROR}));
    }
    //生成密码的散列值
    password = EncryptUtils.toMD5(password);
    //用户登录
    User.login(name, password, function (err, users) {
        if(err){
            console.error('用户登录异常' + err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        if(users.length === 1){
            var user = users[0];
            return res.send(JSON.stringify({status:Code.SUCCESS,user:user,token:createUserToken(user.name,user.id)}));
        }else{
            return res.send(JSON.stringify({status:Code.USERNAME_PASSWORD_ERROR}));
        }
    });
};



function createUserToken(userName,id){
    var desS = 'name=' + userName + '&id=' + id;
    var token = EncryptUtils.encryptDES(desS,SystemConstant.KEY);
    return token;
};

exports.modify = function (req,res){
    var user = {
        name : req.body.name,
        email : req.body.email,   //邮箱
        mobile : req.body.mobile, //手机
        sex : req.body.sex, //性别
        introduction : req.body.introduction,//描述
        modify : new Date()
    };
    var id = req.body.id;
    User.modify(user,id,function(err,result){
        if(err){
            console.error(err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        if(result.affectedRows === 1){
            return res.send(JSON.stringify({status:0}));
        }else{
            return res.send(JSON.stringify({status:Code.MODIFY_ERROR}));
        }
    });
};

exports.search = function(req,res){
    var key = req.params.key;
    User.search(key,function(err,users){
        if(err){
            console.error('搜索用户失败',err);
            return res.send({status:Code.SYSTEM_ERROR});
        }
        return res.send({status:Code.SUCCESS,users:users});
    });
};


/**
 * token拦截器
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */
exports.verifyUserToken = function(req,res,next){
    var user = verifyToken(req.param('token'));
    if(!user.id){
        return res.send(JSON.stringify({status:Code.SIRN_ERROR}));
    }
    req.user = user;
    next();
};



function verifyToken(token){
    var user = Querystring.parse(EncryptUtils.decryptDES(token,SystemConstant.KEY));
    return user;
};














