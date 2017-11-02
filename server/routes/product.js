var router = require('koa-router')();
const axios = require('axios');
const {
	url
} = require('../config/index');
var querystring = require('querystring');

router.get('/get-category.json', async(ctx, next) => {
		let cid = ctx.query.cid,
			result = [];
		await axios.get(url + '/category/queryChildList?pid=' + cid).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	/**
	 * 根据分类id或者产品查询关键字，获取品牌列表
	 * 
	 */
	.post('/get-brand.json', async(ctx, next) => {
		let param = ctx.request.body,
			result = {};
		let uri = url + "/product/queryBandList"
		await axios.post(uri, querystring.stringify(param)).then(res => {
			result = res.data;
		})
		ctx.body = result;

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
		let param = ctx.request.body,
			result = {};
		try {
			await axios.post(url + "/product/queryProductList", querystring.stringify(param)).then(res => {
				result = res.data;
			})
		} catch (e) {
			result = {
				isSucc: false,
				message: "请求失败！"
			}
		}
		ctx.body = result

	})
	.post('/get-brand-product.json', async(ctx, next) => {
		let param = ctx.request.body,
			result = {};
		try {
			await axios.post(url + "/product/queryProductBySupplier", querystring.stringify(param)).then(res => {
				result = res.data;
			})
		} catch (e) {
			console.log(e);
			result = {
				isSucc: false,
				message: "请求失败！"
			}
		}
		ctx.body = result
	})
	.get('/get-product-byId.json', async(ctx, next) => {
		let result = {},
			id = ctx.query.id;
		try {
			await axios.get(url + '/product/queryProductDetails/' + id).then(res => {
				/*console.log(res.data)*/
				result = res.data;
			})
		} catch (err) {

		}
		ctx.body = result;
	})
	.post('/get-product-info-byid.json', async(ctx, next) => {
		let param = ctx.request.body,
			result, product = {};
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			//获取产品基本信息
			await axios.get(url + "/auth/supplier/getProduct?productId=" + param.pid).then(res => {
				product.basic = res.data.result.product;
				result = res.data
			})

			//获取产品的引导图
			await axios.get(url + "/auth/supplier/getProductImgs?productId=" + param.pid).then(res => {
				product.imgs = res.data.result;
			})

			//获取产品规格
			await axios.get(url + "/auth/supplier/getUpdateProductSpecs?productId=" + param.pid).then(res => {
				product.spec = res.data.result;
			})

			//获取产品属性
			await axios.get(url + '/product/queryProductPropertyByCategory/' + param.pid).then(res => {
				product.attr = res.data.result;
			})

			//获取产品详情
			await axios.get(url + "/auth/supplier/getIntroduct?productId=" + param.pid).then(res => {
				product.info = res.data.result;
			})

			//获取产品包装参数
			await axios.get(url + "/auth/supplier/getProductPack?productId=" + param.pid).then(res => {
				product.pack = res.data.result;
			})

			//获取产品运输要求
			await axios.get(url + "/auth/supplier/getTransportation?productId=" + param.pid).then(res => {
				product.transport = res.data.result;
			})
			result.product = product;
		} else {
			result = {
				isSucc: false,
				code: 104
			}
		}
		ctx.body = result;
	})
	.post('/get-attr-price.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		let specId = "",
			specVaild = "";
		param.specs.map(item => {
			specId += item.specId + ",";
			specVaild += item.select_value + ","
		})
		specId = specId.substr(0, specId.length - 1);
		specVaild = specVaild.substr(0, specVaild.length - 1);
		let uri = url + "/product/queryProductItemByIds?productId=" + param.id + "&specId=" + specId + "&specValId=" + specVaild;
		console.log(134, uri)
		await axios.get(uri).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-like-product.json', async(ctx, next) => {
		let id = ctx.query.id,
			result;
		try {

			await axios.get(url + '/product/querySimilarProduct/' + id).then(res => {
				result = res.data
			})
		} catch (e) {
			result = {
				isSucc: false
			}
		}

		ctx.body = result
	})
	.post('/get-favorite-product.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/collect/queryCollectProductList", querystring.stringify(param)).then(res => {
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
	.post('/save-product-basic.json', async(ctx, next) => {
		ctx.body = {
			id: 1,
		}
	})
	.post('/add-product-basic.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProduct", querystring.stringify(param)).then(res => {
				/*console.log(69, res.data)*/
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
	.post('/save-product-imgs.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductImages", querystring.stringify(param)).then(res => {
				/*console.log(69, res.data)*/
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
	.post('/save-transport.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductTransportation", querystring.stringify(param)).then(res => {
				/*console.log(69, res.data)*/
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
	.post('/save-product-info.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductIntroduct", querystring.stringify(param)).then(res => {
				/*console.log(69, res.data)*/
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
	.post('/save-product-spec.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductSpec/", querystring.stringify(param)).then(res => {
				/*console.log(69, res.data)*/
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
	.post('/get-product-basic.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getProduct?productId=" + ctx.request.body.pid).then(res => {
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
	.post('/get-product-imgs.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getProductImgs?productId=" + ctx.request.body.pid).then(res => {
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
	.post('/get-product-specif.json', async(ctx, next) => {
		let result, pid = ctx.request.body.pid;
		await axios.get(url + "/product/queryProductSpecDetails/" + pid).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-instruct-unit.json', async(ctx, next) => {
		let result;
		await axios.post(url + "/unit/queryUnitTypeAndUnit", {}).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/get-product-pack.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getProductPack?productId=" + param.pid).then(res => {
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
	.post('/get-product-spec.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getUpdateProductSpecs?productId=" + param.pid).then(res => {
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
	.post('/get-product-introduct.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getIntroduct?productId=" + param.pid).then(res => {
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
	.post('/get-product-transport.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.get(url + "/auth/supplier/getTransportation?productId=" + param.pid).then(res => {
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
	/**
	 * 获取代理商产品
	 * @param  {[type]} '/get-agent-products.json' [description]
	 * @param  {[type]} async(ctx,                 next          [description]
	 * @return {[type]}                            [description]
	 */
	.get('/get-agent-products.json', async(ctx, next) => {

		let products = [],
			total = 300;
		ctx.body = {
			products: products,
			total: total,
		}

	})

//或者产品属性
.post('/get-product-attr.json', async(ctx, next) => {
		let productId = ctx.request.body.productId,
			result;
		await axios.get(url + '/product/queryProductPropertyByCategory/' + productId).then(res => {
			result = res.data;
		})
		ctx.body = result
	})
	/**
	 * 上传产品的属性信息，attr：已有属性，new_attr：自定义属性
	 */
	.post('/save-product-attr.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductProperties", querystring.stringify(param)).then(res => {
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
	.post('/save-product-spec.json', async(ctx, next) => {
		let param = ctx.request.body;
		ctx.body = true
	})
	.get('/get-product-info-modal.json', async(ctx, next) => {
		let modal = [];

		ctx.body = {
			modal: modal
		}
	})
	.post('/save-product-instrct.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/supplier/addProductPacking", querystring.stringify(param)).then(res => {
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
	.get('/get-product-unit.json', async(ctx, next) => {
		let result;
		await axios.post(url + '/unit/queryUnitByStatus', querystring.stringify({
			status: 1
		})).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
module.exports = router;