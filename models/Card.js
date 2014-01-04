/**
 * Created by quyangcode_air on 13-12-31.
 */
var db = require('./DB.js');

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

var selectUserCardSql = 'select * from card_info where toId = ? and type = 1';
var insertCardSql = 'insert into card_info set ?';
var selectCardSql = 'select * from card_info where ?';

Card.getCardsByUserId = function(userId,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(selectUserCardSql,[userId],function(err,cards){
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
        con.query(selectCardSql,[{id:id}],function(err,cards){
            return callback(err,cards);
        })
    });
};
//todo 还未写完
Card.giveUserCard = function(cardId,UserId,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.query(function(err,re){});
    });

};