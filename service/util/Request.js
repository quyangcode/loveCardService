/**
 * Created by quyang on 13-12-23.
 */
var http = require('http');
var querystring = require('querystring');

module.exports = Request;

function Request(){};

Request.Get = function(url,callback){
    var req = http.get(url,function(res){
        var body = '';
        res.on('data',function(data){
            body += data;
        }).on('end',function(){
                callback(body);
            });
    });
    req.end();
};

Request.Post = function(host,port,path,data,callback){
    data = querystring.stringify(data);
    var options = {
        host: host,
        port: port,
        method: 'POST',
        path: path,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Content-Length": data.length
        }
    };
    var req = http.request(options,function(res){
        var body = "";
        res.on('data',function(data){
            body += data;
        }).on('end',function(){
            callback(body);
        });
    });
    req.write(data);
    req.end();
};

Request.Put = function(host,port,path,callback){
    var options = {
        host: host,
        port: port,
        method: 'PUT',
        path: path,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    };
    var req = http.request(options,function(res){
        var body = "";
        res.on('data',function(data){
            body += data;
        }).on('end',function(){
                callback(body);
            });
    });
    req.end();
};