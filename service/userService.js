/**
 * 用户相关业务操作
 *
 */

var crypto = require('crypto');
var User = require('../models/user.js');
var Step = require('step');
var Code = require('../models/code.js');

function UserService() {
}

module.exports = UserService;

/**
 * 注册
 * @param req
 * @param res
 */
UserService.register = function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;
    var age = req.body.age;
    var sex = req.body.sex;
    if (name == null || password == null || email == null || age == null || sex == null) {
        return {code: Code.PARAMETER_ERROR};
    }
    //检验用户两次输入的密码是否一致
    if (password2 != password) {
        return {code: Code.PASSWORD_AGAIN_ERROR};
    }
    //生成密码的散列值
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    var newUser = new User({
        name: name,
        password: password,
        email: email,
        age: age,
        sex: sex,
        description: null,
        location: null,
        picAddress: null,
        loverId: 0,
        loverNmae: null
    });
};

UserService.getUserById = function(req,res){

    var id = req.params.userId;
    User.getUserById(id,function(err,user){
        if(err){
            console.error('根据ID查询user失败'+ err);
        }
        res.send(user);

    });
};

/**
 * 登录
 * @param req
 * @param res
 */
UserService.login = function (req, res) {
    //生成密码的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.isExist(req.body.name, password, function (err, user) {
        if (!user) {
            req.flash('error', '用户名密码错误!');
            return res.redirect('/login');
        }
        user.portraitSrc = user.portraitSrc.replace('public', '');
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/post');
    });
};








