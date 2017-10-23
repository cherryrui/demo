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
		await axios.post(url+'/auth/quotation/queryQuotationOrderList',querystring.stringify(param)).then(res=>{
			console.log(res.data)
			result = res.data;
		});
		ctx.body = result;
		
	})
	.get('/get-quotation-byid.json', async(ctx, next) => {
		let id = ctx.query.id;
		let result;
		await axios.post(url + "/quotation/queryQuotationById", querystring.stringify({
			quotationId: id,
			userId: ctx.cookie.get('uid')
		})).then(res => {
			console.log(502, res.data)
			result = res.data;
		})
		ctx.body = result

	})
	.post('/create-quotation.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		try {
			await axios.post(url + "/quotation/insertQuotationOrder", querystring.stringify(param)).then(res => {
				console.log(600, res.data);
				result = res.data;
			})
		} catch (e) {
			console.log(e);
			result = {
				isSucc: false
			}
		}
		ctx.body = result;
	})

module.exports = router;