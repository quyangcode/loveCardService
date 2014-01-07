
/*
 * GET home page.
 */
var userservice = require('../service/UserService.js');
var cardservice = require('../service/CardService.js');

module.exports = function(app){

    /**
     * 登录接口
     * 登陆错误返回错误码  成功返回登陆用户信息
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
    app.post('/user',userservice.verifyUserToken);
    /**
     * 修改用户信息接口
     */
    app.post('/user',userservice.modify);


    /**
     * 送卡片
     */
    app.put('/card/id/:id/toId/:toId/token/:token',userservice.verifyUserToken);

    app.put('/card/id/:id/toId/:toId/token/:token',cardservice.sendCardToUser);

    /**
     * 创建卡片
     */

    app.put('/card/name/:name/description/:description/token/:token',userservice.verifyUserToken);

    app.put('/card/name/:name/description/:description/token/:token',cardservice.newCard);

    /**
     * 我的卡片
     */
    app.get('/card/token/:token',userservice.verifyUserToken);

    app.get('/card/token/:token',cardservice.getUserCards);

    /**
     * 好友送我的卡片
     */
    app.get('/card/friendId/:friendId/token/:token',userservice.verifyUserToken);

    app.get('/card/friendId/:friendId/token/:token',cardservice.getFriendCards);


};

