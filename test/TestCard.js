/**
 * Created by quyangcode_air on 14-1-4.
 */
var should = require('should');
var request = require('../service/util/Request.js');
var EncryptUtils = require('../service/util/EncryptUtils.js');
var SystemConstant = require('../config/SystemConstant.js');

describe('test card ',function(){

    it('PUT /card/id/:id/toId/:toId/token/:token',function(done){
        request.Put('localhost',3000,'/card/id/2/toId/2/token/871e4e174730abd4fe40acbb092d78bdb8c710cbf37ed768',function(res){
            console.log(res);
            done();
        });
    });

//    it('test des',function(){
//        var token = EncryptUtils.encryptDES('name=quyangcode&id=1',SystemConstant.KEY);
//        var de = EncryptUtils.decryptDES(token,SystemConstant.KEY);
//        de.should.equal('name=quyangcode&id=1');
//        console.log(de);
//    });

//    it('PUT /card/name/:name/de../:de/token/:token',function(done){
//        var name = encodeURIComponent('DOTA卡');
//        var de = encodeURIComponent('DOTA一小时，使用时间周一到周五');
//        request.Put('localhost',3000,'/card/name/' + name + '/description/' + de + '/token/871e4e174730abd4fe40acbb092d78bdb8c710cbf37ed768',
//            function(res){
//                res = JSON.parse(res);
//                res.should.have.property('status',0);
//                done();
//        });
//    });
});