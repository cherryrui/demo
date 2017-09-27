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
        let carts = [{
            id: 1,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 2,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 3,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 4,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 5,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, ]
        console.log(carts);
        ctx.body = {
            carts: carts,
            cart_num: 10
        }
    })
    .post('/add-cart.json', async(ctx, next) => {
        console.log(41, ctx.request.body);
        let param = ctx.request.body;
        param.authorization = ctx.cookie.get('token');;
        console.log(param);
        await axios.post(url + "/auth/shopCar/addCar", querystring.stringify(param)).then(res => {
            console.log(res.data);
        })
        ctx.body = {
            cart: {
                id: 6,
                name: "Product name",
                img: "../img/product.jpg",
                num: 3
            }
        }
    })
    .get('/get-carts.json', async(ctx, next) => {

        let data = [{
            id: 1,
            name: "product nameni你打大萨达阿萨德阿萨德阿萨德撒大声地撒大声地打手大大打手大萨达阿达撒大声地打手d",
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
        }, {
            id: 4,
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
        }, ]
        ctx.body = {
            carts: data
        }
    })
    .post('/delete-cart.json', async(ctx, next) => {
        let ids = ctx.request.body;
        ctx.body = true;
    })
    .post('/commit-order.json', async(ctx, next) => {
        ctx.body = true
    })

module.exports = router;