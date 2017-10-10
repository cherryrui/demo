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

		/*let categorys = [];
		let type = ctx.query.type,
			id = ctx.query.cid;
		switch (Number(type)) {
			case 0:
				break;
			case 1:
				categorys = [{
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
				break;
			case 2:
				categorys = [{
					id: 1,
					name: "dasTool",
					img: "../img/cate_1.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}, {
					id: 1,
					name: "dasTool",
					img: "../img/cate_2.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}, {
					id: 1,
					name: "dasTool",
					img: "../img/cate_3.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}, {
					id: 1,
					name: "dasTool",
					img: "../img/cate_4.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}, {
					id: 1,
					name: "dasTool",
					img: "../img/cate_5.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}, {
					id: 1,
					name: "dasTool",
					img: "../img/cate_6.jpg",
					items: [{
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, {
						id: 1,
						name: "dasdasdas"
					}, ]
				}]
				break;
			case 3:
				categorys = [{
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
				break;
			default:
				break;
		}

		ctx.body = {
			categorys: categorys,
			category_name: "Tools"
		}*/
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