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
module.exports = router;