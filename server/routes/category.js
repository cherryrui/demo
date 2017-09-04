var router = require('koa-router')();
const axios = require('axios');

/**
 * 获取所有一级分类
 * type: 0:所有分类，1：所有一级分类，2：某一级分类下的2级分类，3：某2级分类下的三级分类
 * id： 父分类id
 */
router.get('/get-category.json', async(ctx, next) => {
		let categorys = [];
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
			default:
				break;
		}

		ctx.body = {
			categorys: categorys,
			category_name: "Tools"
		}
	})
	.get('/get-brand-category.json', async(ctx, next) => {
		let category = [],
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
		}
	})

module.exports = router;