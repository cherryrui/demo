const router = require('koa-router')();
var zh = require('../public/lib/zh.js');

router.get('/', async(ctx, next) => {
	await ctx.render('index', {
		title: 'Hello Koa 2!',
		messages: "",
		antd: null,
		locale: 'zh-Hans-CN',
	})
})
module.exports = router