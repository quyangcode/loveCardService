/**
 * Created by quyangcode_air on 14-1-20.
 */
var db = require('./DB.js');

module.exports = exports = Relationship;

var insertRelationshipSql = 'insert into card_relationship set ?';

function Relationship(relationship){
    this.user_id = relationship.userId;
    this.friend_id = relationship.friendId;
    this.status = 0;
    this.yn = 1;
    this.create = new Date();
    this.modify = new Date();
}


Relationship.prototype.save = function(callback){
    var relationship = this;
    db.getConnection(function (err, con) {
        if (err) {
            return callback(err);
        }
        con.query(insertRelationshipSql, [relationship], function (err, result) {
            callback(err);
        });
    });
};

