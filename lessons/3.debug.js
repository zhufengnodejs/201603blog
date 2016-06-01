var debug = require('debug');
//调用此方法可以得到日志记录器实例
//参数是这个日志记录器的名称
var loggerServer = debug('201603blog:server');
loggerServer('server');
//调用此方法可以得到日志记录器实例
var loggerClient = debug('201603blog:client');
loggerClient('client');

