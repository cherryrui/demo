const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
var cors = require('koa-cors');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const index = require('./routes/index');
const en = require('./routes/en');
const {
	cookieOptions
} = require('./config/index');

const users = require('./routes/users');
const user = require('./routes/user.js');
const category = require('./routes/category.js');
const api = require('./routes/api.js');
const product = require('./routes/product.js');
const brand = require('./routes/brand.js');
const cart = require('./routes/cart.js');
const quotation = require('./routes/quotation.js');
const img = require('./routes/img.js');
const order = require('./routes/order.js');

// error handler
onerror(app)
	// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(cors());
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
	extension: 'hjs',
	map: {
		hjs: 'hogan'
	}
}))

// logger
app.use(async(ctx, next) => {
		ctx.cookie = {
			set: (k, v, opt) => {
				opt = Object.assign({}, cookieOptions, opt);
				return ctx.cookies.set(k, v, opt);
			},
			get: (k, opt) => {
				opt = Object.assign({}, cookieOptions, opt);
				return ctx.cookies.get(k, opt);
			}
		};
		const start = new Date()
		await next()
		const ms = new Date() - start
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})
	// routes
router.use('/api', api.routes(), api.allowedMethods());
router.use('/product', product.routes(), product.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/category', category.routes(), category.allowedMethods());
router.use('/brand', brand.routes(), brand.allowedMethods());
router.use('/cart', cart.routes(), cart.allowedMethods());
router.use('/quotation', quotation.routes(), quotation.allowedMethods());
router.use('/img', img.routes(), img.allowedMethods());
router.use('/order', order.routes(), order.allowedMethods());
router.use('/cn', en.routes(), en.allowedMethods());
router.use('/', index.routes(), index.allowedMethods());
app.use(router.routes(), router.allowedMethods());

module.exports = app