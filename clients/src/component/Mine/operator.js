/**
 * Created by WF on 2017/9/4.
 */
export default {
    menu: [
        {
            name: "mine.person",
            list: [
                {key: 1000, title: "mine.person.data", url: "/main/"},
                {key: 1001, title: "mine.person.address", url: "/main/"},
                {key: 1002, title: "mine.person.account", url: "/main/"},
            ]
        }, {
            name: "mine.order",
            list: [
                {key: 2000, title: "mine.order.all", url: "/main/"},
            ]
        }, {
            name: "mine.message",
            list: [
                {key: 3000, title: "mine.message.system", url: "/main/"},
                {key: 3001, title: "mine.message.consult", url: "/main/"},
            ]
        }, {
            name: "mine.favorite",
            list: [
                {key: 4000, title: "mine.favorite.product", url: "/main/mine/favorite-product"},
                {key: 4001, title: "mine.favorite.brand", url: "/main/"},
            ]
        }, {
            name: "mine.agent",
            list: []
        }, {
            name: "mine.supplier",
            list: []
        },
    ]
}