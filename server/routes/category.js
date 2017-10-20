var router = require('koa-router')();
const axios = require('axios');
const {
	url,
} = require('../config/index');
var querystring = require('querystring');
/**
 * 获取所有一级分类
 * type: 0:所有分类，1：所有一级分类，2：某级分类的所有下级分类
 * id： 父分类id
 */
router.get('/get-category.json', async(ctx, next) => {

		let categorys = [],
			result = null;
		let pid = ctx.query.pid;

		await axios.get(url + `/category/queryChildList?pid=${pid}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	/**
	 *  获取一级分类的所有子分类
	 */
	.get('/get-child-category.json', async(ctx, next) => {
		let result,
			id = ctx.query.cid;
		await axios.get(url + '/category/queryLevelOneAndLevelTwoProductCategoryList?pid=' + id).then(res => {
			result = res.data;
		})
		ctx.body = result
	})
	.get('/get-brand-category.json', async(ctx, next) => {

		let result = null;
		const supplierId = ctx.query.supplierId;
		await axios.get(url + `/supplier/queryCategoryBySupplierId/${supplierId}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	/**
	 * 获取收藏的分类，1：产品，2：供应商
	 * @param  {[type]} '/get-favorite-category.json' [description]
	 * @param  {[type]} async(ctx,                    next          [description]
	 * @return {[type]}                               [description]
	 */
	.post('/get-favorite-category.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			let uri = url;
			if (param.type == 1) {
				uri += "/auth/collect/queryCollectProductCategoryTotal";
			} else {
				uri += "/auth/collect/queryCollectSupplierCategoryTotal";
			}
			await axios.post(uri, querystring.stringify(param)).then(res => {
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
	.get('/get-agent-category.json', async(ctx, next) => {
		let result = null;
		await axios.get(url + '/category/queryLevelOneProductCategoryList').then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-two-category.json', async(ctx, next) => {
		let result,
			id = ctx.query.cid;
		await axios.get(url + '/category/onlyGetLevelTwoProductCategoryList?categoryId=' + id).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})

module.exports = router;