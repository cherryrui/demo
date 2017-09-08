var router = require('koa-router')();
const axios = require('axios');

router.get('/get-conditions.json', async(ctx, next) => {
		let cid = ctx.query.cid;
		let brand = [],
			category = [];
		let data = [{
			id: 1,
			img: "../img/br_bg_1.jpg",
			name: "Tools",
			category_id: 1,
			rating: 4.5
		}, {
			id: 2,
			img: "../img/br_bg_1.jpg",
			name: "Building Materials",
			category_id: 1,
			rating: 4.5
		}, {
			id: 3,
			img: "../img/br_bg_1.jpg",
			name: "Machinery",
			category_id: 2,
			rating: 4.5
		}, {
			id: 4,
			img: "../img/br_bg_1.jpg",
			name: "Mechanical components",
			category_id: 3,
			rating: 4.5
		}, {
			id: 5,
			img: "../img/br_bg_1.jpg",
			name: "Labor protection",
			category_id: 2,
			rating: 4.5
		}, {
			id: 6,
			img: "../img/br_bg_1.jpg",
			name: "Torque tools",
			category_id: 5,
			rating: 4.5
		}, {
			id: 7,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 4,
			rating: 4.5
		}, {
			id: 8,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 4,
			rating: 4.5
		}, {
			id: 9,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 6,
			rating: 4.5
		}, {
			id: 10,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 8,
			rating: 4.5
		}, {
			id: 11,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 2,
			rating: 4.5
		}, {
			id: 12,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 5,
			rating: 4.5
		}, {
			id: 13,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 6,
			rating: 4.5
		}, {
			id: 14,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 9,
			rating: 4.5
		}, {
			id: 15,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 11,
			rating: 4.5
		}, {
			id: 16,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 11,
			rating: 4.5
		}, {
			id: 17,
			img: "../img/br_bg_1.jpg",
			name: "dsadasdsa",
			category_id: 11,
			rating: 4.5
		}, ];
		ctx.body = {
			brand: data,
			category: data,
		}

	})
	/**
	 * 根据搜索条件获取产品数据
	 * condition：查询条件，info:2级分类列表或者产品名称、供应商名称
	 * cid：三级分类id，bid:供应商id，
	 * @param  {[type]} '/search-product.json' [description]
	 * @param  {[type]} async(ctx,             next          [description]
	 * @return {[type]}                        [description]
	 */
	.post('/search-product.json', async(ctx, next) => {
		let param = ctx.request.body;
		console.log(param);
		let products = [{
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
		}, {
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
		}, ]
		ctx.body = {
			products: products,
			sum: 100,
			pageSize: 10,
		}

	})
	.get('/get-product-byId.json', async(ctx, next) => {
		let product = {},
			products,
			id = ctx.query.id;
		product = {
			id: 1,
			price: 200,
			name: "年底萨达撒大萨达撒",
			sales: 2000,
			imgs: ["../img/product.jpg", "../img/product.jpg", "../img/product.jpg", "../img/product.jpg"],
			brand: {
				id: 1,
				name: "SUPPLY NAME",
				img: '../img/br_main.jpg',
				rating: 4.5
			},
			attr: [{
				id: 1,
				name: "颜色",
				value: [{
					id: 1,
					value: "红色"
				}, {
					id: 2,
					value: "蓝色"
				}, {
					id: 3,
					value: "绿色"
				}]
			}, {
				id: 2,
				name: "尺寸",
				value: [{
					id: 1,
					value: "23"
				}, {
					id: 2,
					value: "24"
				}, {
					id: 3,
					value: "25"
				}]
			}, ]
		}
		products = [{
			id: 1,
			name: "Tools",
			price: 90,
			img: "../img/product.jpg"
		}, {
			id: 2,
			name: "Tools",
			price: 90,
			img: "../img/product.jpg"
		}, {
			id: 3,
			name: "Tools",
			price: 90,
			img: "../img/product.jpg"
		}, {
			id: 4,
			name: "Tools",
			price: 90,
			img: "../img/product.jpg"
		}, ];
		let reviews = [{
			id: 1,
			create_time: "2017-09-12 12:12:14",
			question: "asdasdasdasdasdasdasda",
			answer: "dsdsadas da ProductDetail.js"
		}, {
			id: 2,
			create_time: "2017-09-12 12:12:14",
			question: "asdasdasdasdasdasdasda你打大時代按時大大大大薩達阿薩德薩達阿薩德阿斯頓撒大大大大薩達奧術大師打手打手大大大薩達撒大薩達奧術大師大薩達薩達阿薩德撒大聲地",
			answer: "dsdsadas da ProductDetail.js"
		}, {
			id: 3,
			create_time: "2017-09-12 12:12:14",
			question: "asdasdasdasdasdasdasda",
			answer: "dsdsadas da ProductDetail.js"
		}, {
			id: 4,
			create_time: "2017-09-12 12:12:14",
			question: "asdasdasdasdasdasdasda",
			answer: "dsdsadas da ProductDetail.js"
		}, ];
		ctx.body = {
			product: product,
			products: products,
			reviews: reviews
		}

	})
	.get('/get-like-product.json', async(ctx, next) => {
		let products = [];
		products = [{
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
		}, ];
		ctx.body = {
			products: products
		}
	})
	.get('/get-favorite-product.json', async(ctx, next) => {
		let products = [],
			total = 99;
		products = [{
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
		}, ];
		ctx.body = {
			products: products,
			total: total
		}
	})

module.exports = router;