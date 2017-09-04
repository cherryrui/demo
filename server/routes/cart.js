/**
 * Created by WF on 2017/9/4.
 */
var router = require('koa-router')();
const axios = require('axios');

router.get('/get-shopping-cart.json',async(ctx,next)=>{
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
.post('/add-cart.json',async(ctx,next)=>{
    console.log(41,ctx.request.body);
    ctx.body={
        cart: {
            id: 6,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }
    }
})

module.exports = router;