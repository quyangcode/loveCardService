
/*
 * GET home page.
 */
var userservice = require('../service/UserService.js');

module.exports = function(app){

    /**
     * 登录接口
     */
	app.get('/user/name/:name/password/:password/',userservice.login);

    /**
     * 查询用户名是否已存在
     */
    app.get('/user/name/:name',userservice.isUserNameExist);

    /**
     * 注册接口
     */
    app.post('/user',userservice.register);


};

