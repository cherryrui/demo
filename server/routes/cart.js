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
        axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
        let result;
        try {
            await axios.post(url + '/auth/head/queryShopCarTotal').then(res => {
                result = res.data;
            })
        } catch (e) {
            result = {
                isSucc: false,
            }
        }
        ctx.body = result;
    })
    .post('/add-cart.json', async(ctx, next) => {
        let param = ctx.request.body;
        axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
        await axios.post(url + "/auth/shopCar/addCar", querystring.stringify(param)).then(res => {
            if (res.data.isSucc) {
                axios.post(url + '/auth/head/queryShopCarTotal').then(res => {
                    result = res.data;
                })
            }
        })
        ctx.body = result;
    })
    .get('/get-carts.json', async(ctx, next) => {
        axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');
        let param = {
                pageNo: 1,
                pageSize: 100,
            },
            result;
        await axios.post(url + "/auth/shopCar/queryShopCarList", querystring.stringify(param)).then(res => {
            console.log(res.data);
            result = res.data;
        })
        ctx.body = result;
    })
    .post('/delete-cart.json', async(ctx, next) => {
        let ids = ctx.request.body;
        axios.defaults.headers.common['authorization'] = ctx.cookie.get('token');

        await axios.post(url + "/auth/shopCar/deleteShops", querystring.stringify({
            ids: ids.join(",")
        })).then(res => {
            console.log(res.data)
        })
        ctx.body = true;
    })
    .post('/commit-order.json', async(ctx, next) => {
        ctx.body = true
    })

module.exports = router;