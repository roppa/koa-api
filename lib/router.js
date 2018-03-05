const Router = require('koa-router');
const router = new Router();

const docsRouter = require('./docs');
const uploadRouter = require('./upload');

router.use('/docs', docsRouter.routes(), docsRouter.allowedMethods());
router.use('/uploads', uploadRouter.routes(), uploadRouter.allowedMethods());

router.get('/', (ctx) => {
  ctx.body = 'hello world';
});

module.exports = router;
