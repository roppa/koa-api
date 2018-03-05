const Router = require('koa-router');
const uploadRouter = new Router();

uploadRouter.post('/binary', (ctx) => {
  ctx.body = ctx.text;
});

uploadRouter.post('/text', (ctx) => {
  ctx.body = ctx.request.rawBody;
});

module.exports = uploadRouter;
