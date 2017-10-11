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
		await axios.get(url + '/payment/queryPaymentWayList').then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/pay-order.json', async(ctx) => {
		let result = null;
		const param = ctx.request.body;
		//console.log(param);
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/order/payOrder', querystring.stringify(param)).then(res => {
			//console.log('pay-order:',res.data);
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/get-user-order.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			let uri = url;
			if (param.type == 1) {
				uri += "/auth/order/queryUserOrderByOrderIdOrProductName";
			} else {
				uri += "/auth/order/queryUserOrderByOrderStatus";
			}
			await axios.post(uri, querystring.stringify(param)).then(res => {
			/*console.log(69, res.data)*/
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
	.post('/get-order-detail.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/order/queryUserOrderDetails", querystring.stringify(param)).then(res => {
				console.log(93, res.data)
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


module.exports = router;