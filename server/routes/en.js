const router = require('koa-router')()

router.get('/', async(ctx, next) => {
	console.log(4, "en");
	await ctx.render('index-en', {
		title: 'chuanchuan'
	})
})
module.exports = router