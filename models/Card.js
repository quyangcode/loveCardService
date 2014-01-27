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
var selectCardByUserIdSql = 'select * from card_info where toId = ? and type = 1 and yn = 1';
var selectFriendCard4userIdSql = 'select * from card_info where toId = ? and fromId = ? and type = 2 and yn = 1';
var selectCardsByIds = 'select * from card_info where id in ( $ids$ ) and yn = 1';
var useCardSql = 'update card_info set yn = 0 where id = ? and toId = ?';
//消息语句 事务使用
var insertMessSql = 'insert into card_message set ?';


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

Card.getCardsByIds = function(ids,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        var tempSql = selectCardsByIds.replace('$ids$',ids);
        con.query(tempSql,function(err,cards){
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

Card.useCard = function(id,userId,message,callback){
    db.getConnection(function(err,con){
        if(err){
            return callback(err);
        }
        con.beginTransaction(function(err){
            if(err){
                return con.rollback(callback(err));
            }
            con.query(useCardSql,[id,userId],function(err){
                if(err){
                    return con.rollback(callback(err));
                }
                con.query(insertMessSql,[message],function(err){
                    if(err){
                        return con.rollback(callback(err));
                    }
                    con.commit(callback(err));
                });
            });
        });

    });
}