var router = require('koa-router')();
const axios = require('axios');
const {
	url
} = require('../config/index');
var querystring = require('querystring');

/**
 * 获取所有一级分类，购物最近商品和购物车总商品种量
 */
router.get('/get-title-data.json', async(ctx, next) => {
		let categorys = null,
			carts = [];
		await axios.get(url + '/index/queryLevelOneProductCategoryList').then(res => {
			categorys = res.data;
		});
		ctx.body = {
			categorys: categorys,
			carts: carts,
			cart_num: 11
		};
	})
	.get('/get-main-data.json', async(ctx, next) => {
		let brand = [],
			category = [];
		try {
			await axios.get(url + '/index/queryProductCategoryList').then(res => {
				category = res.data;
			});
			await axios.get(url + '/index/querySupplierList').then(res => {
				console.log(res.data);
				brand = res.data;
			});
		} catch (e) {}
		ctx.body = {
			category: category,
			brand: brand
		};
	})
	/**
	 *首页需求管理接口
	 *
	 **/
	.post('/demand-controller.json', async(ctx) => {
		let result,
			param = ctx.request.body;
		await axios.post(url + '/auth/demand/insertDemand', querystring.stringify(param)).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/set-star.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/collect/insertCollect", querystring.stringify(param)).then(res => {
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