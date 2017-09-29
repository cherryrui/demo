const router = require('koa-router')();
const axios = require('axios');
axios.defaults.headers.common['authorization'] = "";
router.get('/', async(ctx, next) => {
	console.log('/sdasdas');
	await ctx.render('index', {
		title: '川川 ',
	})
})
module.exports = router