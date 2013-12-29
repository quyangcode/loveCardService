/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var log4js = require('log4js');
var app = express();

var server = http.createServer(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: './public/images/upload',
    limit: '1mb'
}));
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

log4js.configure({
    appenders: [
        { type: 'console' },{
            type: 'file',
            filename: 'log/cardAll.log',
            maxLogSize: 102400,
            backups:4,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
app.use(log4js.connectLogger(log4js.getLogger('normal'), {level:'auto', format:':method :url'}));
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
routes(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
