/**
 * Created by quyangcode_air on 13-12-15.
 */

var db = require('./DB.js');
var async = require('async');
var EncryptUtils = require('../service/util/EncryptUtils.js');
var SystemConstant = require('../config/SystemConstant.js');

function User(user) {
    this.name = user.name;  //用户名
    this.password = user.password;  // 密码
    this.email = null;   //邮箱
    this.mobile = null; //手机
    this.sex = 2; //性别
    this.headShot = user.headShot; //头像图片地址
    this.yn = 1;
    this.status = 1;
    this.introduction = '介绍下自己，让别人认识你.';
    this.create = new Date();
    this.modify = new Date();

};

module.exports = User;


var insertUserSql = 'insert into card_user set ?';
var selectUserByIdSql = 'select * from card_user where id = ?';
var selectUserByNameSql = 'select * from card_user where name = ?';
var loginSql = 'select * from card_user where name = ? and password = ?';
var updateUserSql = 'update card_user set ? where ?';

/**
 * 插入用户
 * @param callback
 */
User.save = function (user,callback) {
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(insertUserSql,user,function(err,result){
            callback(err,result.affectedRows);
        });
    });
};

/**
 * 根据id获得用户
 * @param id
 * @param callback
 */
User.getUserById = function (id, callback) {//读取用户信息
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(selectUserByIdSql,[id],function(err,users){
            callback(err,users);
        });
    });
};

/**
 * 根据name获得用户信息
 * @param name
 * @param callback
 */
User.getUserByName = function (name, callback) {
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(selectUserByNameSql,[name],function(err,users){
            return callback(err,users);
        });
    });
};

/**
 * 用户是否存在 存在更新token绑定用户状态
 * @param name
 * @param password
 * @param callback
 */
User.login = function (name, password, callback) {
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(loginSql,[name,password],function(err,users){
            callback(err,users);
        });
    });
};

/**
 * 修改用户信息
 * @param user
 * @param callback
 */
User.modify = function(user,id,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(updateUserSql,[user,{id:id}],function(err,result){
            return callback(err,result);
        });
    });
};



