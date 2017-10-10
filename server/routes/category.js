var router = require('koa-router')();
const axios = require('axios');
const {
	url,
} = require('../config/index');

/**
 * 获取所有一级分类
 * type: 0:所有分类，1：所有一级分类，2：某级分类的所有下级分类
 * id： 父分类id
 */
router.get('/get-category.json', async(ctx, next) => {

		let categorys = [],
			result = null;
		let pid = ctx.query.pid;	

		await axios.get(url+`/category/queryChildList?pid=${pid}`).then(res =>{
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
		await axios.get(url+`/supplier/queryCategoryBySupplierId/${supplierId}`).then(res =>{
			result = res.data;
		})
		ctx.body = result;

		/*let category = [],
			bid = ctx.query.cid;
		category = [{
			id: 1,
			name: "Category name"
		}, {
			id: 2,
			name: "Category name"
		}, {
			id: 3,
			name: "Category name"
		}, {
			id: 4,
			name: "Category name"
		}, {
			id: 5,
			name: "Category name"
		}, {
			id: 6,
			name: "Category name"
		}, {
			id: 7,
			name: "Category name"
		}, {
			id: 8,
			name: "Category name"
		}, ]
		ctx.body = {
			category: category
		}*/
	})
	.get('/get-favorite-category.json', async(ctx, next) => {
		let category = [];
		category = [{
			id: 1,
			name: "Category name"
		}, {
			id: 2,
			name: "Category name"
		}, {
			id: 3,
			name: "Category name"
		}, {
			id: 4,
			name: "Category name"
		}, {
			id: 5,
			name: "Category name"
		}, {
			id: 6,
			name: "Category name"
		}, {
			id: 7,
			name: "Category name"
		}, {
			id: 8,
			name: "Category name"
		}, ]
		ctx.body = {
			category: category
		}
	})
	.get('/get-agent-category.json', async(ctx, next) => {
		let category = [];
		category = [{
			id: 1,
			name: "一级分类1"
		}, {
			id: 2,
			name: "一级分类2"
		}, {
			id: 3,
			name: "一级分类3"
		}, {
			id: 4,
			name: "一级分类4"
		}, {
			id: 5,
			name: "一级分类5"
		}, {
			id: 6,
			name: "一级分类6"
		}, {
			id: 7,
			name: "Category name"
		}, {
			id: 8,
			name: "Category name"
		}, ]
		ctx.body = {
			category: category
		}
	})

module.exports = router;