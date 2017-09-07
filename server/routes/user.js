var router = require('koa-router')();
const axios = require('axios');

router.get('/get-user.json', async(ctx, next) => {
		let id = ctx.query.id;
		console.log(4, id);
		let user = {
			id: 1,
			name: "张三"
		}
		ctx.cookie.set('uid', user.id);
		ctx.body = {
			user: user,
		}
	})
	.post('/login.json', async(ctx, next) => {
		let data = ctx.request.body;
		console.log(data);
		let status = true,
			result;

		result = {
				id: 1,
				name: "张三"
			}
			/*status = false;
			result = "账号密码错误";*/
		if (status) {
			ctx.cookie.set('uid', result.id);
		}
		ctx.body = {
			status: status,
			result: result,
		}

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
module.exports = router;