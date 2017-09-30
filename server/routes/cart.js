/**
 * Created by WF on 2017/9/4.
 */
var router = require('koa-router')();
const axios = require('axios');
var querystring = require('querystring');
const {
    url,
} = require('../config/index');

router
    .get('/get-shopping-cart.json', async(ctx, next) => {
        let result;
        try {
            if (ctx.cookie.get("token")) {
                axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
                await axios.post(url + '/auth/head/queryShopCarTotal').then(res => {
                    result = res.data;
                })
            } else {
                result = {
                    isSucc: false,
                    code: 104
                }
            }
        } catch (e) {
            result = {
                isSucc: false,
            }
        }
        console.log(result);
        ctx.body = result;
    })
    .post('/add-cart.json', async(ctx, next) => {
        let param = ctx.request.body,
            result;
        if (ctx.cookie.get("token")) {
            axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
            await axios.post(url + "/auth/shopCar/addCar", querystring.stringify(param)).then(res => {
                result = res.data;
            })
        } else {
            result = {
                isSucc: false,
                code: 104
            }
        }
        if (result.isSucc) {
            await axios.post(url + '/auth/head/queryShopCarTotal').then(res => {
                result = res.data;
            })
        }
        console.log(result)
        ctx.body = result;
    })
    .get('/get-carts.json', async(ctx, next) => {
        let result = {};
        console.log(ctx.cookie.get('token'))
        if (ctx.cookie.get('token')) {
            axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
            let param = {
                pageNo: 1,
                pageSize: 100,
            };
            try {
                await axios.post(url + "/auth/shopCar/queryShopCarList", querystring.stringify(param)).then(res => {
                    console.log(res.data);
                    result = res.data;
                })
            } catch (e) {
                console.log(e);
            }
        } else {
            result = {
                isSucc: false,
                code: 104
            }
        }
        ctx.body = result;
    })
    .post('/delete-cart.json', async(ctx, next) => {
        let ids = ctx.request.body,
            result;
        if (ctx.cookie.get("token")) {
            axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
            await axios.post(url + "/auth/shopCar/deleteShops", querystring.stringify({
                ids: ids.join(",")
            })).then(res => {
                result = res.data
            })
            if (result.isSucc) {
                await axios.post(url + '/auth/head/queryShopCarTotal').then(res => {
                    result = res.data;
                })
            }
        } else {
            result = {
                isSucc: false,
                code: 104
            }
        }
        ctx.body = result;
    })

module.exports = router;