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
		};
	})
	.get('/get-main-data.json', async(ctx, next) => {
		let brand = [],
			category = [],
			categoryList = [],
			activity = null,
			ads = [];
		let param = {
			activeId: 1
		}
		try {
			await axios.get(url + '/index/queryProductCategoryList').then(res => {
				category = res.data;
			});
			await axios.get(url + '/index/querySupplierList').then(res => {
				console.log(res.data);
				brand = res.data;
			});
			await axios.get(url + '/index/queryLevelOneProductCategoryList').then(res => {
				categoryList = res.data;
			});
			await axios.post(url + '/activity/queryNextActivity').then(res => {
				activity = res.data.result;
				console.log(42, activity);
			})
			await axios.post(url + '/ads/queryAdsByTime', querystring.stringify({
				positionId: 1
			})).then(res => {
				ads = res.data.result;
			})
		} catch (e) {

		}
		ctx.body = {
			category: category,
			brand: brand,
			categoryList: categoryList,
			activity: activity,
			ads: ads,
		};
	})
	/**
	 *首页需求管理接口
	 *
	 **/
	.post('/demand-controller.json', async(ctx) => {
		let result,
			param = ctx.request.body;
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
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