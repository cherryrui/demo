var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
	url,
} = require('../config/index');
router.get('/get-quotation.json', async(ctx, next) => {
		let quotations = [],
			total = 1;
		quotations = [{
			id: 1,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}, {
			id: 2,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}, {
			id: 3,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}, {
			id: 4,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}, {
			id: 5,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}, ]
		ctx.body = {
			quotation: quotations,
			total: total
		}
	})
	.get('/get-quotation-byid.json', async(ctx, next) => {
		let id = ctx.query.id;
		let quotation;
		quotation = {
			id: 5,
			subject: "dsadas",
			create_time: "",
			img: "../img/product.jpg",
			num: 10,
			sale_total: 100,
			agent_total: 80,
			products: [{
				id: 2,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "28",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, {
				id: 3,
				name: "product name",
				img: '../img/product.jpg',
				price: 100,
				agent_price: 80,
				num: 20,
				attr: [{
					id: 1,
					value: 1,
					name: "红色",
					attr: [{
						id: 1,
						name: "红色"
					}, {
						id: 2,
						name: "蓝色"
					}, {
						id: 3,
						name: "绿色"
					}, ]
				}, {
					id: 2,
					value: 2,
					name: "红色",
					attr: [{
						id: 1,
						name: "27"
					}, {
						id: 2,
						name: "28"
					}, {
						id: 3,
						name: "29"
					}, ]
				}]
			}, ],
			num: 0,
			postage: 100,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型
			clients: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
			agent: {
				company: "dsadsa",
				name: "dsad",
				tel: "1232132"
			},
		}
		ctx.body = {
			quotation: quotation
		}

	})
	.post('/create-quotation.json', async(ctx, next) => {
		let param = ctx.request.body;
		await axios.post(url + "", querystring.stringify(param)).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})

module.exports = router;