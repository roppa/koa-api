const debug = require('debug')('app')
const Koa = require('koa');
const app = new Koa();
debug('Instantiated app')

require('./middleware')(app);
module.exports = app;
