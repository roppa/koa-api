const helmet = require('koa-helmet');
const router = require('./router');
const debug = require('debug')('middleware')
const log = require('./log');
const bodyParser = require('koa-bodyparser');
const contentType = require('content-type')
const getRawBody = require('raw-body')

const middleware = (app) => {

  debug('Binding helmet');
  log.info('Binding helmet');
  app.use(helmet());

  if (process.env.NODE_ENV === 'production') {
    app.use(async (ctx, next) => {
      ctx.text = await getRawBody(ctx.req, {
        length: ctx.req.headers['content-length'],
        limit: '10mb',
        encoding: contentType.parse(ctx.req).parameters.charset,
      })
      next();
    })
  }

  debug('Adding body parser');  
  app.use(bodyParser({
    enableTypes: ['text'],
  }));

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
    .use(router.allowedMethods())
    .use(async function pageNotFound(ctx) {
      ctx.status = 404;
      switch (ctx.accepts('html', 'json')) {
        case 'html':
          ctx.type = 'html';
          ctx.body = '<p>Page Not Found</p>';
          break;
        case 'json':
          ctx.body = {
            message: 'Page Not Found'
          };
          break;
        default:
          ctx.type = 'text';
          ctx.body = 'Page Not Found';
      }
    });
} 

module.exports = middleware;
