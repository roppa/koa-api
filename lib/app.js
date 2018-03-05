const debug = require('debug')('app')
const Koa = require('koa');
const app = new Koa();
const log = require('./log');
debug('Instantiated app');
log.info('Initiated app');

require('./middleware')(app);

app.on('error', err => {
  log.error('server error', err)
});

module.exports = app;
