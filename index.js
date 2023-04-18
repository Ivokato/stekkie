import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';

import indexHtml from './index.html.js';
import privacyPolicyHtml from './privacy-policy.html.js';

const router = new Router();

const PORT = process.env.PORT || 80;

const app = new Koa();

// keys are needed when doing stuff with cookies
app.keys = ['one key'];

router.get('/', ctx => {
  ctx.body = indexHtml;
});

router.get('/privacy-policy', ctx => {
  ctx.body = privacyPolicyHtml;
});

app
.use(serve('./public', {hidden: true}))
.use(router.routes())
.use(router.allowedMethods());

app.listen(PORT);
console.log(`Stekkie listening at ${PORT}`);
