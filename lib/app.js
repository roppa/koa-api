const Koa = require('koa');
const app = new Koa();
require('./middleware')(app);

module.exports = app;
