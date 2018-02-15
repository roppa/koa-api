const helmet = require('koa-helmet');
const router = require('./router');
const debug = require('debug')('middleware')

const middleware = (app) => {

  debug('Binding helmet');
  app.use(helmet());

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    debug(`${ctx.method} ${ctx.url} - ${ms}`);
  });

  debug('Adding routes')
  app
    .use(router.routes())
    .use(router.allowedMethods());

} 

module.exports = middleware;
