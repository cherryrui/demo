const router = require('koa-router')();
const axios = require('axios');
axios.defaults.headers.common['authorization'] = "";
router.get('/', async(ctx, next) => {
	await ctx.render('index', {
		title: 'chuanchuan ',
	})
})
module.exports = router