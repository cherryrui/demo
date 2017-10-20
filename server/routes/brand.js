var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
	url,
} = require('../config/index');
router.get('/get-recommend-brand.json', async(ctx, next) => {

	})
	.post('/get-brand.json', async(ctx, next) => {
		let result = null;
		let brand = [];
		const param = ctx.request.body;
		var arrs = {};
		for (var k in param) {
			if (param.hasOwnProperty(k) && param[k] != '' && param[k] != undefined) {
				arrs[k] = param[k];
			}
		}
		arrs = querystring.stringify(arrs);
		await axios.get(url + `/supplier/querySupplierList?${arrs}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-brand-byid.json', async(ctx, next) => {

		let result = null;
		const supplierId = ctx.query.supplierId;
		await axios.get(url + `/supplier/querySupplierById?supplierId=${supplierId}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/get-favorite-brand.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/collect/queryCollectSupplierList", querystring.stringify(param)).then(res => {
				result = res.data;
			})
		} else {
			result = {
				isSucc: false,
				code: 104
			}
		}
		ctx.body = result;
	})
	.get('/get-agent-brand.json', async(ctx, next) => {
		let uid = ctx.cookie.get('uid');
		let brand = [];

		ctx.body = {
			brand: brand
		}
	})
module.exports = router;