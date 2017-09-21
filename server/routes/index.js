const router = require('koa-router')();
var zh = require('../public/lib/zh.js');
var message = require('../public/locale/zh_message.js');

router.get('/', async(ctx, next) => {
	console.log('/sdasdas');
	await ctx.render('index', {
		title: 'Hello ',
	})
})
module.exports = router