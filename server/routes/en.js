const router = require('koa-router')()

router.get('/', async(ctx, next) => {
	console.log(4, "en");
	await ctx.render('index-en', {
		title: 'Hello Koa 2!'
	})
})
module.exports = router