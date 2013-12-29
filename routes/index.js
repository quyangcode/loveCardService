
/*
 * GET home page.
 */
var userservice = require('../service/UserService.js');

module.exports = function(app){

    /**
     * 登录接口 登陆错误返回错误码  成功返回登陆用户信息
     */
	app.get('/user/name/:name/password/:password',userservice.login);

    /**
     * 查询用户名是否已存在
     */
    app.get('/user/name/:name',userservice.isUserNameExist);

    /**
     * 注册接口
     */
    app.put('/user/name/:name/password/:password',userservice.register);

    /**
     * 修改用户信息拦截器 验证token有效性
     */
    app.post('/user',userservice.verifyToken);
    /**
     * 修改用户信息接口
     */
    app.post('/user',userservice.modify);


};

