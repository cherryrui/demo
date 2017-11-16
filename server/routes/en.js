const router = require('koa-router')()
const axios = require('axios');
axios.defaults.headers.common['authorization'] = "";
router.get('/', async(ctx, next) => {
	console.log(4, "en");
	await ctx.render('index-en', {
		title: '川川'
	})
})
module.exports = router