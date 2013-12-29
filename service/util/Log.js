var log4js = require('log4js');

exports.getLog=function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
}
