var router = require('koa-router')();
const axios = require('axios');

/**
 * 获取所有一级分类，购物最近商品和购物车总商品种量
 */
router.get('/get-title-data.json', async(ctx, next) => {
		let categorys = [],
			carts = [];
		categorys = [{
			id: 1,
			name: "Category nameCategory nameCategory nameCategory name"
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
		}, ];
		carts = [{
			id: 1,
			name: "Product name",
			img: "../img/product.jpg",
			num: 3
		}, {
			id: 2,
			name: "Product name",
			img: "../img/product.jpg",
			num: 3
		}, {
			id: 3,
			name: "Product name",
			img: "../img/product.jpg",
			num: 3
		}, {
			id: 4,
			name: "Product name",
			img: "../img/product.jpg",
			num: 3
		}, {
			id: 5,
			name: "Product name",
			img: "../img/product.jpg",
			num: 3
		}, ]
		ctx.body = {
			categorys: categorys,
			carts: carts,
			cart_num: 10
		}
	})
	.get('/get-main-data.json', async(ctx, next) => {
		let brand = [],
			category = [];
		brand = [{
			id: 1,
			name: "SUPPLIER NAME",
			img: '../img/branch_1.jpg',
			dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors "
		}, {
			id: 1,
			name: "SUPPLIER NAME",
			img: '../img/branch_1.jpg',
			dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
		}, {
			id: 1,
			name: "SUPPLIER NAME",
			img: '../img/branch_1.jpg',
			dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
		}, {
			id: 1,
			name: "SUPPLIER NAME",
			img: '../img/branch_1.jpg',
			dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
		}, {
			id: 1,
			name: "SUPPLIER NAME",
			img: '../img/branch_1.jpg',
			dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
		}, ];
		category = [{
				id: 1,
				name: "tools",
				img: "../img/cate_bg_1.jpg",
				cate: [{
					id: 1,
					name: "Electric tools"
				}, {
					id: 2,
					name: "Hardware tools"
				}, {
					id: 3,
					name: "Torque tools"
				}, {
					id: 4,
					name: "Wrench"
				}, {
					id: 5,
					name: "Electric tools"
				}, {
					id: 6,
					name: "Hardware tools"
				}, ],
				goods: [{
					id: 1,
					name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 2,
					name: "dsds",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 4,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 5,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 6,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
					price: 2132,
					img: '../img/product.jpg'
				}, ],
				branch: [{
					id: 0,
					name: "SUPPLIER NAME",
					descrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors",
					img: "../img/br_main.jpg",
				}, {
					id: 1,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 2,
					name: "dasdaadsa",
					img: "../img/br_bg_2.jpg"
				}, {
					id: 3,
					name: "dasdaadsa",
					img: "../img/br_bg_3.jpg"
				}, {
					id: 4,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 5,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 6,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, ]
			}, {
				id: 2,
				name: "tools",
				img: "../img/cate_bg_2.jpg",
				cate: [{
					id: 1,
					name: "Electric tools"
				}, {
					id: 2,
					name: "Hardware tools"
				}, {
					id: 3,
					name: "Torque tools"
				}, {
					id: 4,
					name: "Wrench"
				}, {
					id: 5,
					name: "Electric tools"
				}, {
					id: 6,
					name: "Hardware tools"
				}, ],
				goods: [{
					id: 1,
					name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 2,
					name: "dsds",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 4,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 5,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 6,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
					price: 2132,
					img: '../img/product.jpg'
				}, ],
				branch: [{
					id: 0,
					name: "SUPPLIER NAME",
					descrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors",
					img: "../img/br_main.jpg",
				}, {
					id: 1,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 2,
					name: "dasdaadsa",
					img: "../img/br_bg_2.jpg"
				}, {
					id: 3,
					name: "dasdaadsa",
					img: "../img/br_bg_3.jpg"
				}, {
					id: 4,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 5,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 6,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, ]
			}, {
				id: 3,
				name: "tools",
				img: "../img/cate_bg_3.jpg",
				cate: [{
					id: 1,
					name: "Electric tools"
				}, {
					id: 2,
					name: "Hardware tools"
				}, {
					id: 3,
					name: "Torque tools"
				}, {
					id: 4,
					name: "Wrench"
				}, {
					id: 5,
					name: "Electric tools"
				}, {
					id: 6,
					name: "Hardware tools"
				}, ],
				goods: [{
					id: 1,
					name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 2,
					name: "dsds",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 4,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 5,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 6,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
					price: 2132,
					img: '../img/product.jpg'
				}, ],
				branch: [{
					id: 0,
					name: "SUPPLIER NAME",
					descrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors",
					img: "../img/br_main.jpg",
				}, {
					id: 1,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 2,
					name: "dasdaadsa",
					img: "../img/br_bg_2.jpg"
				}, {
					id: 3,
					name: "dasdaadsa",
					img: "../img/br_bg_3.jpg"
				}, {
					id: 4,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 5,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 6,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, ]
			}, {
				id: 1,
				name: "tools",
				img: "../img/cate_bg_3.jpg",
				cate: [{
					id: 1,
					name: "Electric tools"
				}, {
					id: 2,
					name: "Hardware tools"
				}, {
					id: 3,
					name: "Torque tools"
				}, {
					id: 4,
					name: "Wrench"
				}, {
					id: 5,
					name: "Electric tools"
				}, {
					id: 6,
					name: "Hardware tools"
				}, ],
				goods: [{
					id: 1,
					name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 2,
					name: "dsds",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 4,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 5,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 6,
					name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
					price: 2132,
					img: '../img/product.jpg'
				}, {
					id: 3,
					name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
					price: 2132,
					img: '../img/product.jpg'
				}, ],
				branch: [{
					id: 0,
					name: "SUPPLIER NAME",
					descrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors",
					img: "../img/br_main.jpg",
				}, {
					id: 1,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 2,
					name: "dasdaadsa",
					img: "../img/br_bg_2.jpg"
				}, {
					id: 3,
					name: "dasdaadsa",
					img: "../img/br_bg_3.jpg"
				}, {
					id: 4,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 5,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, {
					id: 6,
					name: "dasdaadsa",
					img: "../img/br_bg_1.jpg"
				}, ]
			}],
			ctx.body = {
				brand: brand,
				category: category
			}
	})
module.exports = router;