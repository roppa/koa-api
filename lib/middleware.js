const helmet = require('koa-helmet');
const router = require('./router');

const middleware = (app) => {

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
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());

} 

module.exports = middleware;
