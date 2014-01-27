/**
 * Created by quyangcode_air on 14-1-4.
 */
var should = require('should');
var request = require('../service/util/Request.js');
var EncryptUtils = require('../service/util/EncryptUtils.js');
var SystemConstant = require('../config/SystemConstant.js');

describe('test card ',function(){

//    it('PUT /card/ids/:ids/toId/:toId/token/:token 送人卡片',function(done){
//        request.Put('localhost',3000,'/card/ids/2_6/toId/2/token/871e4e174730abd4fe40acbb092d78bdb8c710cbf37ed768',function(res){
//            res = JSON.parse(res);
//            res.should.have.property('status',0);
//            done();
//        });
//    });

//    it('test des ',function(){
//        var token = EncryptUtils.encryptDES('name=quyangcode&id=1',SystemConstant.KEY);
//        var de = EncryptUtils.decryptDES(token,SystemConstant.KEY);
//        de.should.equal('name=quyangcode&id=1');
//        console.log(token);
//    });

//    it('PUT /card/name/:name/de../:de/token/:token   创建卡片',function(done){
//        var name = encodeURIComponent('捶背卡');
//        var de = encodeURIComponent('捶背3小时，使用时间周一到周五');
//        request.Put('localhost',3000,'/card/name/' + name + '/description/' + de + '/token/871e4e174730abd4fe40acbb092d78bdb8c710cbf37ed768',
//            function(res){
//                res = JSON.parse(res);
//                res.should.have.property('status',0);
//                done();
//        });
//    });
//
//    it('GET /card/token/:token 我的卡片',function(done){
//        var token = '871e4e174730abd4fe40acbb092d78bdb8c710cbf37ed768';
//        request.Get('http://localhost:3000/card/token/' + token,function(res){
//            res = JSON.parse(res);
//            res.should.have.property('status',0);
//            console.log(res.cards);
//            done();
//        });
//    });
//
//    it('GET /card/friendId/:friendId/token/:token 好友送我的卡片',function(done){
//        request.Get('http://localhost:3000/card/friendId/1/token/871e4e174730abd4a2aaa143e98ef71f59c377a3a98a45b0',function(res){
//            res = JSON.parse(res);
//            res.should.have.property('status',0);
//            console.log(res.cards);
//            done();
//        });
//
//    });

    it('POST /card/id/:id',function(done){
        request.Post('localhost',3000,'/card',{
            id: 2,
            token: '871e4e174730abd4a2aaa143e98ef71f59c377a3a98a45b0'
        },function(res){
            res = JSON.parse(res);
            res.should.have.property('status',0);
            done();
        });

    })


});