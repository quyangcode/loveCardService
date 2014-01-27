/**
 * Created by quyangcode_air on 14-1-21.
 */

var Message = require('../models/Message.js');
var MessageType = require('../config/MessageType.js');
var Code = require('../config/Code.js');

exports.save = function(req,res){
    var type = req.param('type');
    if(type == MessageType.APPLY_FRIEND){
        applyFriend(req,res);
    }else{
        res.send(JSON.stringify({status:Code.PARAMETER_ERROR}));
    }

};

function applyFriend(req,res){
    var mess = {
        fromId: req.param('fromId'),
        toId: req.param('toId'),
        type: MessageType.APPLY_FRIEND,
        content: req.user.name + '加您为好友，去看看吧！'
    };
    var message = new Message(mess);
    message.save(function(err){
        if(err){
            console.error('申请好友失败,mess=' + mess,err);
            return res.send(JSON.stringify({status:Code.SYSTEM_ERROR}));
        }
        return res.send(JSON.stringify({status:Code.SUCCESS}));
    });


}
