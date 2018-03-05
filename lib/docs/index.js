const Router = require('koa-router');
const docsRouter = new Router();

docsRouter.get('/', (ctx, next) => {
  ctx.body = 'docs';
});

module.exports = docsRouter;
