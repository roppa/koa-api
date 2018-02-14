const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World';
  next();
});

module.exports = router;
