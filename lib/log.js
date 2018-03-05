const bunyan = require('bunyan');

const log = bunyan.createLogger({
  name: 'koa-app',
  streams: [{
    type: 'raw',
    stream: require('bunyan-logstash').createStream({
      host: 'logstash',
      port: 5000
    })
  }]
});

module.exports = log;

module.exports = {
  log: console.log,
  error: console.error,
  warn: console.log,
  info: console.log,
};
