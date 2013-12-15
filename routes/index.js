
/*
 * GET home page.
 */
var Userservice = require('../service/userService.js');

module.exports = function(app){


    /**
     * 注册页路由
     */
	app.get('/user/:userId',Userservice.getUserById);

//    /**
//     * 登录页路由
//     */
//  	app.all('/login', Userservice.checkNotLogin);
//  	app.get('/login',function(req,res){
//    	res.render('login', { title: '登录', typeName:'登录' ,error : req.flash('error').toString(),user: req.session.user});
//  	});
//  	app.post('/login', function(req, res){
//	  	Userservice.login(req,res);
//  	});
//
//

};

