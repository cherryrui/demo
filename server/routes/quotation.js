var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
	url,
} = require('../config/index');
router.post('/get-quotation.json', async(ctx, next) => {
		let result = null,
			param = ctx.request.body;
		/*console.log(param)*/
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/quotation/queryQuotationOrderList', querystring.stringify(param)).then(res => {
			console.log(res.data)
			result = res.data;
		});
		ctx.body = result;

	})
	.get('/get-quotation-byid.json', async(ctx, next) => {
		let id = ctx.query.id;
		let result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/quotation/queryQuotationById", querystring.stringify({
				quotationId: id,
			})).then(res => {
				result = res.data;
			})
		} else {
			result = {
				isSucc: false,
				code: 104
			}
		}
		ctx.body = result

	})
	.post('/create-quotation.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			try {
				axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
				let uri = url;
				if (param.quotationId) {
					uri += "/auth/quotation/updateQuotationOrder";
				} else {
					uri += "/auth/quotation/insertQuotationOrder";
				}
				console.log(50, uri);
				await axios.post(uri, querystring.stringify(param)).then(res => {
					console.log(600, res.data);
					result = res.data;
				})
			} catch (e) {
				console.log(e);
				result = {
					isSucc: false,
					message: e
				}
			}
		} else {
			result = {
				isSucc: false,
				code: 104,
			}
		}
		ctx.body = result;
	})
	.get('/delete-quotation.json', async ctx => {
		let result = null,
			id = ctx.request.query.id;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url + '/auth/quotation/deleteQuotationOrder', querystring.stringify({
			quotationIds: id
		})).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
module.exports = router;