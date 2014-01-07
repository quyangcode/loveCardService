/**
 * Created by quyangcode_air on 13-12-31.
 */

var Card = require('../models/Card.js');
var Code = require('../config/Code.js');

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
function getCardById(cardId,callback){
    Card.getCardById(cardId,function(err,cards){
        if(err){
            console.error('查询卡片失败,id=' + cardId,err);
            return callback(null);
        }else{
            return callback(cards[0]);
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
    var cardId = req.params.id;
    getCardById(cardId,function(card){
        if(card){
            card.toId = toId;
            card.fromId = fromId;
            card.type = 2;
        }else{
            return res.send(JSON.stringify({status:Code.CARD_NOT_EXIST}));
        }
        var newCard = new Card(card);
        newCard.save(function(err,result){
            if(err){
                console.error('发送卡片失败',err);
                return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
            }
            return res.send(JSON.stringify({status:Code.SUCCESS}));
        });
    });

};


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



