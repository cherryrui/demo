/**
 * Created by WF on 2017/9/4.
 */
export default {
    menu: [{
        name: "mine.person",
        list: [{
            key: 1000,
            title: "mine.person.data",
            url: "/main/"
        }, {
            key: 1001,
            title: "mine.person.address",
            url: "/main/mine/person-address"
        }, {
            key: 1002,
            title: "mine.person.account",
            url: "/main/"
        }, ]
    }, {
        name: "mine.order",
        list: [{
            key: 2000,
            title: "mine.order.all",
            url: "/main/mine/order-list"
        }, ]
    }, {
        name: "mine.message",
        list: [{
            key: 3000,
            title: "mine.message.system",
            url: "/main/mine/system-message"
        }, {
            key: 3001,
            title: "mine.message.consult",
            url: "/main/mine/message"
        }, ]
    }, {
        name: "mine.agent.center",
        list: [{
            key: 4000,
            title: "mine.quotation.list",
            url: "/main/mine/quotation-list"
        }]
    }, {
        name: "mine.favorite",
        list: [{
            key: 5000,
            title: "mine.favorite.product",
            url: "/main/mine/favorite/1"
        }, {
            key: 5001,
            title: "mine.favorite.brand",
            url: "/main/mine/favorite/2"
        }, ]
    }, {
        name: "mine.product.management",
        list: [{
            key: 6000,
            title: "mine.product.list",
            url: "/main/mine/agent-product"
        }, {
            key: 6001,
            title: "mine.product.upload",
            url: "/main/mine/product-editor"
        }]
    }, {
        name: "mine.agent",
        list: []
    }, {
        name: "mine.supplier",
        list: []
    }, ]
}