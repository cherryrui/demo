var router = require('koa-router')();
const axios = require('axios');
const Dess = require('des_zxd');
const {
	url,
	des
} = require('../config/index');
var ReqTool = require('../tools/reqTool.js');
import {
	SendEmail
} from '../tools/sendemail.js';
var querystring = require('querystring');

axios.defaults.headers.common['authorization'] = "";

router.get('/get-userinfo-byuid.json', async(ctx, next) => {
		let result = null;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		console.log(ctx.cookie.get('token'));
		await axios.post(url+'/auth/user/getUser').then(res=>{
			if(res.data.isSucc){
				console.log(res.data);
				/*ctx.cookie.set('uid', res.data.result.uid);
				ctx.cookie.set('token', res.data.result.token);*/
				result = res.data;
			}
		})
		ctx.body = result;

		
	})
	.post('/login.json', async(ctx, next) => {
		let result = null;
		let data = ctx.request.body;
		let param = {
			loginName: data.userName,
			password: data.password //Dess.encryptDes(data.password,des.KEY,des.IV)
		};
		await axios.post(url + "/login", querystring.stringify(param)).then(res => {
			result = res.data;
			console.log(result);
			if (result.isSucc == true) {
				ctx.cookie.set('uid', result.result.uid);
				ctx.cookie.set('token', result.result.token);
			}
		})
		ctx.body = result;
	})
	.post('/add-user-address.json', async(ctx) => {
		let result = null;
		let data = ctx.request.body;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/userAddress/insertAddress', querystring.stringify(data)).then(res => {
			console.log('add address:', res.data);
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/update-address.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		console.log(59, param);
		try {
			await axios.post(url + "/auth/userAddress/updateAddress", querystring.stringify(param)).then(res => {
				result = res.data;
			})
		} catch (e) {
			console.log(e);
		}
		ctx.body = result;
	})
	.get('/get-address-list.json', async(ctx, next) => {
		let uid = ctx.query.uid,
			result;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/userAddress/queryAllAddressList').then(res => {
			result = res.data;
		})
		ctx.body = result
	})
	.get('/get-city-by-parent.json', async(ctx, nexy) => {
		let result = null;
		let cid = ctx.query.cid ? ctx.query.cid : 0; //父级城市id
		await axios.post(url + '/district/queryDistrictList').then(res => {
			console.log('get Country', res.data);
			result = res.data;
		})
		ctx.body = {
			address: result
		}
	})
	.get('/get-tel-code.json', async(ctx, body) => {
		let result = {};
		try {
			await axios.post(url + "/districtCode/queryDistrictCodeList").then(res => {
				result = res.data;
			})
		} catch (e) {
			console.log(e);
		}
		ctx.body = result;
	})
	.post('/del-address-byids', async(ctx, body) => {
		let id = ctx.request.body,
			result;
		console.log(id)
		let param = {
			addressIds: id.ids
		};
		if (ctx.cookie.get("token")) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/userAddress/deleteAddress", querystring.stringify(
				param
			)).then(res => {
				result = res.data
			})
		} else {
			result = {
				isSucc: false,
				code: 104
			}
		}
		ctx.body = result;
	})
	.post('/repassword.json', async(ctx) => {
		let result = null,
			param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/modifyPwd',querystring.stringify(param)).then(res =>{
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/register.json', async(ctx) => {
		let result = null;
		let param = ctx.request.body;
		console.log(param)
		await axios.post(url + '/register', querystring.stringify(param)).then(res => {
			console.log(res.data);
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/authentication.json', async(ctx) => {
		let result = {
			status: true,
		};
		ctx.body = result;
	})
	.get('/get-recent-message.json', async(ctx, next) => {
		let message = [{
			id: 1,
			type: 0,
			info: "asdas撒大萨达所大所大撒撒大大撒大萨达按时打算打打打算"
		}, {
			id: 2,
			type: 0,
			info: "asdas撒大萨达所大所大撒撒大大撒大萨达按时打算打打打算"
		}, {
			id: 3,
			type: 0,
			info: "asdas撒大萨达所大所大撒撒大大撒大萨达按时打算打打打算dsadjasdsad sadsadasdasdasdadsa"
		}, {
			id: 4,
			type: 0,
			info: "asdas撒大萨达所大所大撒撒大大撒大萨达按时打算打打打算"
		}, ]
		ctx.body = {
			message: message
		}
	})
	.get('/sendcode.json', async(ctx) => {
		let result = null;
		const email = ctx.request.query.account;
		const type = ctx.request.query.type;//1手机验证  2邮箱验证
		if(type==1){
			await axios.post(url+'/telCode',querystring.stringify({tel:email})).then(res=>{
				result = res.data;
			})
		}else{
			await axios.post(url+'/email',querystring.stringify({email:email})).then(res=>{
				result = res.data;
			})
		}
		
		ctx.body = result;
	})
	.post('/emailcheck.json',async ctx=>{
		let result = null,
			param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/testEmail',querystring.stringify(param)).then(res=>{
			result = res.data;
		})
		/*console.log(result)*/
		ctx.body = result;
	})
	.post('/phonecheck.json',async ctx=>{
		let result = null,
		param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/testTel',querystring.stringify(param)).then(res=>{
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/verifi_email.json',async ctx=>{
		let result = null,
			param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/identificationEmail',querystring.stringify(param)).then(res=>{
			result = res.data;
		});
		ctx.body = result;
	})
	.post('/verifi_phone.json',async ctx=>{
		let result = null,
			param = ctx.request.body;
			console.log(param)
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/identificationTel',querystring.stringify(param)).then(res=>{
			result = res.data;
		});
		ctx.body = result;
	})
	.post('/become-agent.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/usertoAgent/userApplyAgent", querystring.stringify(param)).then(res => {
				console.log(200 + "user", res.data)
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
	.get('/reset-pwd.json', async(ctx) => {

		ctx.body = true;
	})
	.post('/become-supplier.json', async(ctx) => {
		let result = null;
		let param = ctx.request.body;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/usertosupplier/userApplySupplier', querystring.stringify(param)).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.get('/get-transport-way.json', async(ctx, next) => {
		let result;
		await axios.get(url + '/transport/queryTransportWayList').then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/get-center-num.json', async(ctx, next) => {
		let result = {};
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			try {
				//获取需求分状态总数
				await axios.post(url + "/auth/demand/queryEveryStatusTotal", {}).then(res => {
					result = res.data;
					result.demand = res.data.result
				})

				//获取订单分状态数量
				await axios.post(url + "/auth/order/queryUserOrderEveryStatusTotal", {}).then(res => {
					result.order = res.data.result;
				})

				//获取收藏总数
				await axios.post(url + "/auth/collect/queryCollectCategoryTotal", {}).then(res => {
					result.collect = res.data.result;
				})

				//获取推荐产品列表
				await axios.get(url + "/auth/supplier/queryRandomProductList").then(res => {
					result.brand = res.data.result;
				})

				//获取推荐供应商
				await axios.get(url + "/auth/product/queryRandomProductList").then(res => {
					result.product = res.data.result;
				})
			} catch (e) {
				console.log(254, e);
			}
		} else {
			result = {
				isSucc: false,
				code: 104
			}
		}
		ctx.body = result;
	})
	.post('/get-quotation-sum.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/quotation/queryQuotationOrderCount", {}).then(res => {
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
	.post('/updateUser.json', async(ctx) => {
		let result,
			param = ctx.request.body;
		axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
		await axios.post(url + '/auth/user/updateUser', querystring.stringify(param)).then(res => {
			result = res.data;
		})
		ctx.body = result;
	})
	.post('/delete-favorite.json', async(ctx, next) => {
		let param = ctx.request.body,
			result;
		if (ctx.cookie.get('token')) {
			axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
			await axios.post(url + "/auth/collect/deleteCollects", querystring.stringify(param)).then(res => {
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
	.post('/get-requirement-list.json',async (ctx) =>{
		let result = null,
			param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/demand/queryDemandListById',querystring.stringify(param)).then(res =>{
			
			result = res.data;
		})
		ctx.body = result;
	})
	/**
	*企业认证接口
	*
	**/
	.post('/enterpriser.json',async ctx =>{
		let result,
			param=ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/certificateCompany',querystring.stringify(param)).then(res=>{
			result = res.data;
		})
		console.log(result);
		ctx.body = result;
	})
	/**
	*个人认证
	**/
	.post('/person-cerification.json',async ctx=>{
		let result,
			param = ctx.request.body;
		axios.defaults.headers.common["authorization"] = ctx.cookie.get("token");
		await axios.post(url+'/auth/user/certificatePerson',querystring.stringify(param)).then(res=>{
			result = res.data;
		})
		console.log(result);
		ctx.body = result;
	})
module.exports = router;