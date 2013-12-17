/**
 * Created by quyangcode_air on 13-12-15.
 */

var db = require('./DB.js');

function User(user) {
    this.id = user.id;  //id
    this.name = user.name;  //用户名
    this.password = user.password;  // 密码
    this.email = user.email;   //邮箱
    this.mobile = user.mobile; //手机
    this.sex = user.sex; //性别
    this.picAddress = user.picAddress; //头像图片地址
};

module.exports = User;


var insertUserSql = 'insert into card_user set ?';
var selectUserByIdSql = 'select * from card_user where id = ?';
var selectUserByNameSql = 'select * from card_user where name = ?';
var loginSql = 'select count(1) from card_user where name = ? and password = ?';

/**
 * 插入用户
 * @param callback
 */
User.prototype.save = function (callback) {
    db.getConnection(function(err,con){
        if(err){
            return callback(err,null);
        }
        con.query(insertUserSql,this,function(err,rows){
            callback(err,rows);
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
            return callback(err,null);
        }
        con.query(selectUserByIdSql,[id],function(err,users){
            callback(err,users);
        });
    });
};

/**
 *
 * @param name
 * @param callback
 */
User.getUserByName = function (name, callback) {
    db.getConnection(function(err,con){
        if(err){
            return callback(err,null);
        }
        con.query(selectUserByNameSql,[name],function(err,users){
            return callback(err,users);
        });
    });
};

/**
 * 用户是否存在
 * @param name
 * @param password
 * @param callback
 */
User.login = function (name, password, callback) {//读取用户信息
    db.getConnetction(function(err,con){
        if(err){
            return callback(err,null);
        }
        con.query(loginSql,[name,password],function(err,num){
            return callback(err,num);
        });
    });
};




