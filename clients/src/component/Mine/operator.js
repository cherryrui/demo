/**
 * Created by WF on 2017/9/4.
 */
export default {
    menu: [{
        name: "mine.person",
        key: 1000,
        list: [{
            key: 1001,
            title: "mine.person.data",
            url: "/page/mine/person-data"
        }, {
            key: 1002,
            title: "mine.person.address",
            url: "/page/mine/person-address"
        }, {
            key: 1003,
            title: "mine.person.account",
            url: "/page/mine/person-data"
        }, ]
    }, {
        name: "mine.order",
        key: 2000,
        list: [{
            key: 2001,
            title: "mine.order.all",
            url: "/page/mine/order-list"
        }, ]
    }, {
        name: "mine.message",
        key: 3000,
        list: [{
            key: 3001,
            title: "mine.message.system",
            url: "/page/mine/system-message"
        }, {
            key: 3002,
            title: "mine.message.consult",
            url: "/page/mine/message"
        }, ]
    }, {
        name: "mine.agent.center",
        key: 4000,
        list: [{
            key: 4001,
            title: "mine.quotation.list",
            url: "/page/mine/quotation-list"
        }]
    }, {
        name: "mine.favorite",
        key: 5000,
        list: [{
            key: 5001,
            title: "mine.favorite.product",
            url: "/page/mine/favorite/1"
        }, {
            key: 5002,
            title: "mine.favorite.brand",
            url: "/page/mine/favorite/2"
        }, ]
    }, {
        name: "mine.product.management",
        key: 6000,
        list: [{
            key: 6001,
            title: "mine.product.list",
            url: "/page/mine/agent-product"
        }, {
            key: 6002,
            title: "mine.product.upload",
            url: "/page/mine/product-editor"
        }]
    }, {
        name: "mine.agent",
        key: 7000,
        url: '/page/mine/agent',
        list: []

    }, {
        name: "mine.supplier",
        key: 8000,
        url: 'page/mine/supplier',
        list: []
    }, ]
}