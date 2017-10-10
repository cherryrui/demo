var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
	url,
} = require('../config/index');
router.get('/get-recommend-brand.json', async(ctx, next) => {

	})
	.post('/get-brand.json', async(ctx, next) => {
		let result = null;
		let brand = [];
		const param = ctx.request.body;
		var arrs = {};
		for(var k in param){
			if(param.hasOwnProperty(k) && param[k] != '' && param[k] != undefined){
				arrs[k] = param[k];
			}
		}
		arrs = querystring.stringify(arrs);
		await axios.get(url+`/supplier/querySupplierList?${arrs}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
		/*let brand = [{
			id: 1,
			name: "Tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 2,
			name: "Building Materials",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 3,
			name: "Machinery",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 4,
			name: "Mechanical components",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 5,
			name: "Labor protection",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 6,
			name: "Torque tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 7,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 8,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, ]
		ctx.body = {
			brand: brand,
			sum: 100
		}*/
	})
	.get('/get-brand-byid.json', async(ctx, next) => {
		
		let result = null;
		const supplierId = ctx.query.supplierId;
		await axios.get(url+`/supplier/querySupplierById?supplierId=${supplierId}`).then(res => {
			result = res.data;
		})
		ctx.body = result;
		/*let brand, id = ctx.query.id;
		brand = {
			id: 1,
			name: "Brand Name",
			img: "../img/br_main.jpg",
			descrip: "你好年好阿打算打手大大大大大打手大",
			rating: 4.5,
		};
		ctx.body = {
			brand: brand
		}*/
	})
	.get('/get-like-brand.json', async(ctx, next) => {



		let brands = [];
		brands = [{
			id: 1,
			name: "Tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 2,
			name: "Building Materials",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 3,
			name: "Machinery",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 4,
			name: "Mechanical components",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 5,
			name: "Labor protection",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, ]
		ctx.body = {
			brands: brands
		}
	})
	.get('/get-favorite-brand.json', async(ctx, next) => {
		let brand = [],
			total = 99;
		brand = [{
			id: 1,
			name: "Tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 2,
			name: "Building Materials",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 3,
			name: "Machinery",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 4,
			name: "Mechanical components",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 5,
			name: "Labor protection",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 6,
			name: "Torque tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 7,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 8,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, ]
		ctx.body = {
			brand: brand,
			total: total
		}
	})
	.get('/get-agent-brand.json', async(ctx, next) => {
		let uid = ctx.cookie.get('uid');
		let brand = [];
		brand = [{
			id: 1,
			name: "Tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 2,
			name: "Building Materials",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 3,
			name: "Machinery",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 4,
			name: "Mechanical components",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 5,
			name: "Labor protection",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 6,
			name: "Torque tools",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 7,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, {
			id: 8,
			name: "dsadasdsa",
			rating: 4.5,
			img: '../img/br_bg_1.jpg'
		}, ]
		ctx.body = {
			brand: brand
		}
	})
module.exports = router;