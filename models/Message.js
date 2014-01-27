/**
 * Created by quyangcode_air on 14-1-20.
 */
var db = require('./DB.js');

function Message(message){
    this.content = message.content;
    this.from_id = message.fromId;
    this.to_id = message.toId;
    this.status = 0;
    this.type = message.type; //查看MessageType定义
    this.yn = 1;
    this.create = new Date();
    this.modify = new Date();
}

module.exports = exports = Message;

var insertMessSql = 'insert into card_message set ?';

Message.prototype.save = function(callback){
    var message = this;
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(insertMessSql,[message],function(err,result){
            callback(err,result);
        });
    });
}