/**
 * Created by quyangcode_air on 13-12-31.
 */
var db = require('./DB.js');
var mysql = require('mysql');

function Card(card){
    this.name = card.name;
    this.description = card.description;
    this.pic_address = card.pic_address;
    this.fromId = card.fromId;
    this.toId = card.toId;
    this.type = card.type;  //1 我的卡片 2 发给我的卡片
    this.price = card.price;
    this.yn = 1;
    this.create = new Date();
    this.modify = new Date();
}

module.exports = Card;

var insertCardSql = 'insert into card_info set ?';
var selectCardByIdSql = 'select * from card_info where id = ? yn = 1';
var selectCardByUserIdSql = 'select * from card_info where toId = ? and type = 1 and yn = 1';
var selectFriendCard4userIdSql = 'select * from card_info where toId = ? and fromId = ? and type = 2 and yn = 1';


Card.getCardsByUserId = function(userId,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(selectCardByUserIdSql,userId,function(err,cards){
            return callback(err,cards);
        });
    });
};

Card.prototype.save = function(callback){
    var card = this;
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(insertCardSql,card,function(err,result){
            return callback(err,result);
        });
    });
};

Card.getCardById = function(id,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(selectCardByIdSql,id,function(err,cards){
            return callback(err,cards);
        })
    });
};

Card.getFriendCards = function(friendId,userId,callback){
    db.getConnection(function(err,con){
        if(err){
            callback(err);
        }
        con.query(selectFriendCard4userIdSql,[userId,friendId],function(err,cards){
            callback(err,cards);
        });
    });
};