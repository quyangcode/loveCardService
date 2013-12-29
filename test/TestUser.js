/**
 * Created by quyangcode_air on 13-12-15.
 */
var user = require('../models/User.js');
var should = require('should');
var request = require('../service/util/Request.js');


describe('test  user',function(){
    
    it('PUT /user',function(done){
        var name = encodeURIComponent('西安');
        request.Put('localhost',3000,'/user/name/' + 'quyangtest' + '/password/123456',function(res){
            res = JSON.parse(res);
            res.should.have.property('status',0);
            done();
        });
    });

    it('GET /user/name/:name',function(done){
        var name = encodeURIComponent('西安');
        request.Get('http://localhost:3000/user/name/' + name,function(res){
            res = JSON.parse(res);
            res.should.have.property('status',1006);
            done();
        });
    });

    it('GET /user/name/:name/password/:password',function(done){
        request.Get('http://localhost:3000/user/name/quyang/password/123456',function(res){
            res = JSON.parse(res);
            res.should.have.property('status',0);
            done();
        });

    });

    it('POST /user',function(done){
        request.Post('localhost',3000,'/user',{
            id:1,
            name:'quyangcode',
            mobile:'12345678911',
            email:'quyang@gmail.com',
            introduction:'小菜鸡',
            sex:1,
            modify:new Date(),
            token:'6f11e07d073241bd377906b7df7158fc'
        },function(res){
            res = JSON.parse(res);
            res.should.have.property('status',0);
            done();
        });
    });
});
