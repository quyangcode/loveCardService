/**
 * Created by quyangcode_air on 14-1-21.
 */

var Relationship = require('../models/Relationship.js');
var Code = require('../config/Code.js');

exports.applyFriend = function(req,res){
    var newRelationship = new Relationship({
        userId: req.params.fromId,
        friendId: req.user.id
    });
    newRelationship.save(function (err) {
        if (err) {
            console.error('申请好友失败,friend=' + newRelationship, err);
            return res.send(JSON.stringify({status: Code.SYSTEM_ERROR}));
        }
        return res.send(JSON.stringify({status: Code.SUCCESS}));
    });

}