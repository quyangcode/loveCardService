
/*
 * GET home page.
 */
var Userservice = require('../service/UserService.js');

module.exports = function(app){

    /**
     * 登录接口
     */
    app.all('/user/name/:name/password/:password',function(){});
	app.get('/user/name/:name/password/:password',Userservice.login);

    /**
     * 查询用户名是否已存在
     */
    app.get('/user/name/:name',Userservice.isUserNameExist);

    /**
     * 注册接口
     */
    app.post('/user',Userservice.register);
};

