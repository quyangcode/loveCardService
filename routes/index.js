
/*
 * GET home page.
 */
var userService = require('../service/UserService.js');
var cardService = require('../service/CardService.js');
var messageService = require('../service/MessageService.js');
var relationshipService = require('../service/RelationshipService.js');

module.exports = function(app){

    /**
     * 登录接口
     * 登陆错误返回错误码  成功返回登陆用户信息
     */
	app.get('/user/name/:name/password/:password',userService.login);

    /**
     * 查询用户名是否已存在
     */
    app.get('/user/name/:name',userService.isUserNameExist);

    /**
     * 注册接口
     */
    app.put('/user/name/:name/password/:password',userService.register);

    /**
     * 修改用户信息拦截器 验证token有效性
     */
    app.post('/user',userService.verifyUserToken);
    /**
     * 修改用户信息接口
     */
    app.post('/user',userService.modify);


    /**
     * 送卡片
     */
    app.put('/card/ids/:ids/toId/:toId/token/:token',userService.verifyUserToken);

    app.put('/card/ids/:ids/toId/:toId/token/:token',cardService.sendCardToUser);

    /**
     * 创建卡片
     */

    app.put('/card/name/:name/description/:description/token/:token',userService.verifyUserToken);

    app.put('/card/name/:name/description/:description/token/:token',cardService.newCard);

    /**
     * 我的卡片
     */
    app.get('/card/token/:token',userService.verifyUserToken);

    app.get('/card/token/:token',cardService.getUserCards);

    /**
     * 好友送我的卡片
     */
    app.get('/card/friendId/:friendId/token/:token',userService.verifyUserToken);

    app.get('/card/friendId/:friendId/token/:token',cardService.getFriendCards);

    /**
     * 使用卡片
     */
    app.post('/card',userService.verifyUserToken);
    app.post('/card',cardService.useCard);

    /**
     * 模糊搜索用户
     */
    app.get('/user/key/:key',userService.search);

    /**
     * 好友申请
     */
    app.put('/message/type/:type/toId/:id/token/:token',userService.verifyUserToken);

    app.put('/message/type/:type/toId/:id/token/:token',messageService.save);

    /**
     * 接受好友申请
     */
    app.put('/relationship/fromId/:fromId/token/:token',userService.verifyUserToken);
    app.put('/relationship/fromId/:fromId/token/:token',relationshipService.applyFriend);


};

