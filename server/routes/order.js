var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
	url,
} = require('../config/index');

router
	.get('/get-pay-mode.json', async(ctx, next) => {
		let result;
		try {
			await axios.get(url + '/payment/queryPaymentModelList').then(res => {
				result = res.data;
			})
		} catch (e) {
			result = {

			}
		}
		ctx.body = result;
	})
	.get('/get-pay-mode-detail.json', async(ctx, next) => {
		let result, id = ctx.query.pay_mode;
		try {
			await axios.get(url + '/payment/queryPaymentModelDetails?payModelId=' + id).then(res => {
				result = res.data;
			})
		} catch (e) {
			result = {

			}
		}
		ctx.body = result;
	})
	.post('/commit-order.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		console.log(38, url);
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/order/generateOrder', querystring.stringify(param)).then(res => {
			console.log('generateOrder:', res.data)
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-pay-way.json', async(ctx, next) => {
		let result;
		await axios.get(url + '/transport/queryPaymentWayList').then(res => {
			result = res.data;
		})
		ctx.body = result;
	})


module.exports = router;