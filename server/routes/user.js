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

router.get('/get-user.json', async(ctx, next) => {
		let id = ctx.query.id;
		console.log(4, id);
		let user = {
			id: 1,
			name: "张三"
		}
		ctx.cookie.set('uid', user.id);
		ctx.cookie.set('token', user.token);
		ctx.body = {
			user: user,
		}
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
	.get('/get-address-list.json', async(ctx, next) => {
		let uid = ctx.query.uid;
		ctx.body = {
			address: [{
				id: 1,
				name: "张三",
				tel: "2321321",
				address: "你啊实打实阿斯顿撒撒撒打算的撒的撒的撒的撒",
				city: "dsa",
				default: 1,
			}, {
				id: 2,
				name: "张三",
				tel: "2321321",
				address: "你啊实打实阿斯顿撒撒撒打算的撒的撒的撒的撒",
				city: "dsa",
				default: 0,
			}, {
				id: 3,
				name: "张三",
				tel: "2321321",
				address: "你啊实打实阿斯顿撒撒撒打算的撒的撒的撒的撒",
				city: "dsa",
				default: 0,
			}, {
				id: 4,
				name: "张三",
				tel: "2321321",
				address: "你啊实打实阿斯顿撒撒撒打算的撒的撒的撒的撒",
				city: "dsa",
				default: 0,
			}, ]
		}
	})
	.get('/get-city-by-parent.json', async(ctx, nexy) => {
		let cid = ctx.query.cid ? ctx.query.cid : 0; //父级城市id

		let address = [{
			id: cid + 1,
			value: 'zhejiang',
			label: 'Zhejiang',
			isLeaf: cid > 3 ? true : false,
		}, {
			id: cid + 2,
			value: 'jiangsu',
			label: 'Jiangsu',
			isLeaf: cid > 3 ? true : false,
		}];
		ctx.body = {
			address: address
		}
	})
	.post('/repassword.json', async(ctx) => {
		let result = null;
		const data = ctx.request.body;
		console.log('1111: ', JSON.stringify(data));
		const newPwd = data.newpwd;
		console.log(newPwd);
		if (newPwd) {
			result = {
				rc: 200,
				Data: newPwd
			};
		} else {
			result = {
				rc: 202,
				Data: 'resetpassword failed!'
			}
		}
		ctx.body = result;
	})
	.post('/register.json', async(ctx) => {
		let result = null;
		const data = ctx.request.body;
		console.log('1111: ', JSON.stringify(data));
		const param = {
			userName: data.name,
			password: data.password,
			email: data.email,
			tel: data.tel,
			userType: data.tp
		};
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
		const emails = '947863843@qq.com';
		const send = await SendEmail.send({
			emails
		}).then(res => {
			const data = JSON.stringify(res);
			console.log(data);
		});
		ctx.body = true;
	})
	.get('/reset-pwd.json', async(ctx) => {

		ctx.body = true;
	})
module.exports = router;