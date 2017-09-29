const router = require('koa-router')()
const axios = require('axios');
axios.defaults.headers.common['authorization'] = "";
router.get('/', async(ctx, next) => {
	console.log(4, "en");
	await ctx.render('index-en', {
		title: 'chuanchuan'
	})
})
module.exports = router