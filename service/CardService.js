/**
 * Created by quyangcode_air on 13-12-31.
 */

var Card = require('../models/Card.js');
var Code = require('../config/Code.js');
var Message = require('../models/Message.js');
var MessageType = require('../config/MessageType.js');
var async = require('async');

/**
 * 我的卡片 查询用户卡片 用于发送给别人
 * @param req
 * @param res
 */
exports.getUserCards = function(req,res){
    var id = req.user.id;
    Card.getCardsByUserId(id,function(err,cards){
        if(err){
            console.error('查询用户所有卡片异常',err);
            res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        res.send(JSON.stringify({status:Code.SUCCESS,cards:cards}));
    });
};


/**
 * 根据cardId查询卡片
 * @param cardId
 */
function getCardById(cardIds,callback){
    Card.getCardsByIds(cardIds,function(err,cards){
        if(err){
            console.error('查询卡片失败,ids=' + cardIds,err);
            return callback([]);
        }else{
            return callback(cards);
        }
    });
}

/**
 * 发送卡片给好友
 * @param req
 * @param res
 */
exports.sendCardToUser = function(req,res){
    var toId = req.params.toId;
    var fromId = req.user.id;
    var userName = req.user.name;
    var cardIds = req.params.ids.replace(/\_/g,',');
    getCardById(cardIds,function(cards){
        var length = cards.length;
        if(length <= 0){
            return res.send(JSON.stringify({status:Code.CARD_NOT_EXIST}));
        }
        async.each(cards,function(card,callback){
            if (card) {
                card.toId = toId;
                card.fromId = fromId;
                card.type = 2;
                sendCard(card, function (err) {
                    callback(err);
                });
            }
        },function(err){
            //消息不做任何事务处理
            sendCardMessage(fromId,toId,userName,function(err){
                if(err){
                    console.error('插入发送卡片消息失败',err);
                }
                return res.send(JSON.stringify({status:Code.SUCCESS}));
            });
        });
    });
};

/**
 * 发送卡片
 * @param card
 */
function sendCard(card,callback){
    var newCard = new Card(card);
    newCard.save(function(err){
        callback(err);
    });
}

/**
 * 插入发送卡片消息
 * @param fromId
 * @param toId
 * @param userName
 * @param callback
 */
function sendCardMessage(fromId,toId,userName,callback){
    var mess = {
        fromId: fromId,
        toId: toId,
        type: MessageType.SEND_CARD,
        content: userName + '给您送了一些卡片，赶紧去看看吧！',
    };
    var newMessage = new Message(mess);
    newMessage.save(function(err){
        callback(err);
    });

}

/**
 * 创建卡片
 * @param req
 * @param res
 */
exports.newCard = function(req,res){
    var card = new Card({
        name:req.params.name,
        description:req.params.description,
        pic_address:null,
        fromId:0,
        toId:req.user.id,
        price:0,
        type:1
    });
    card.save(function(err,result){
        if(err){
            console.error('创建卡片失败',err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        return res.send(JSON.stringify({status:Code.SUCCESS}));
    });
};

/**
 * 获得好友送我的卡片
 * @param req
 * @param res
 */
exports.getFriendCards = function(req,res){
    var friendId = req.params.friendId;
    var userId = req.user.id;
    Card.getFriendCards(friendId,userId,function(err,cards){
        if(err){
            console.error('查询好友卡片失败',err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        return res.send(JSON.stringify({status:Code.SUCCESS,cards:cards}));
    });

}

exports.useCard = function(req,res){
    var id = req.param('id');
    var userId = req.user.id;
    var userName = req.user.name;
    Card.getCardsByIds(id,function(err,cards){
        if(err){
            console.error('使用卡片失败',err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        console.log(cards[0]);
        var mess = {
            fromId: cards[0].userId,
            toId: cards[0].fromId,
            content: userName + '使用了你送给他的卡片,赶紧去兑现吧!',
            type: MessageType.USE_CARD
        };
        Card.useCard(id,userId,new Message(mess),function(err){
            if(err){
                console.error('使用卡片失败',err);
                return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
            }
            res.send(JSON.stringify({status:Code.SUCCESS}));
        });

    });

}



