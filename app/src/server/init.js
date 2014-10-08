global.S = require('springbokjs-utils');
global.config = Object.freeze(require('../config.js'));

var LoggerConsole = require('springbokjs-logger/console');
global.logger = new LoggerConsole();