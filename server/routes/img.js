var router = require('koa-router')();
const axios = require('axios');
router.post('/save-product-img.json', async(ctx, next) => {
	let param = ctx.request.body;
	ctx.body = {
		fileName: 'product.jpg',
		path: '../img/product.jpg'
	}
})
module.exports = router;