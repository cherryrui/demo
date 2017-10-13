export default {
	order_menu: [{
		key: "all",
		value_id: "order.status.all",
		icon: "../img/DC-1.png",
        url: "/page/mine/order-list"
	}, {
		key: "pay",
		value_id: "orderlist.unconfirm.unpay",
		icon: "../img/DC-2.png",
        url: "/page/mine/order-list"
	}, {
		key: "send",
		value_id: "orderlist.unconfirm.payed",
		icon: "../img/DC-3.png",
        url: "/page/mine/order-list"
	}, {
		key: "receive",
		value_id: "orderlist.confirmed.unpay",
		icon: "../img/DC-4.png",
        url: "/page/mine/order-list"
	}, {
		key: "all",
		value_id: "orderlist.confirmed.instal.unpay",
		icon: "../img/DC-5.png",
        url: "/page/mine/order-list"
	},
        {
            key: "all",
            value_id: "orderlist.confirmed.unpayed",
            icon: "../img/DC-6.png",
            url: "/page/mine/order-list"
        },],
	demand_menu: [{
		key: "all",
		value_id: "app.requirements",
		icon: "../img/DM-1.png"
	}, {
		key: "all",
		value_id: "app.processing",
		icon: "../img/DM-2.png"
	}, {
		key: "all",
		value_id: "app.processed",
		icon: "../img/DM-3.png"
	}, ],
    favorite_menu:[
        {key: "all",
            value_id: "app.goods",
            icon: "../img/MF-1.png",
            url: "/page/mine/favorite/1"},
        {key: "all",
            value_id: "app.supplier",
            icon: "../img/MF-2.png",
            url: "/page/mine/favorite/2"},
    ],quotation_menu:[
        {key: "all",
            value_id: "quotation.all_quotation",
            icon: "../img/Q-1.png",
            url: "/page/mine/quotation-list"
        },
    ],
    management_menu: [{
        key: "all",
        value_id: "order.status.all",
        icon: "../img/PM-1.png",
        url: "/page/mine/agent-product"
    }, {
        key: "pay",
        value_id: "app.proval",
        icon: "../img/PM-2.png",
        url: "/page/mine/agent-product"
    }, {
        key: "send",
        value_id: "app.provaling",
        icon: "../img/PM-3.png",
        url: "/page/mine/agent-product"
    }, {
        key: "receive",
        value_id: "app.not.provaled",
        icon: "../img/PM-4.png",
        url: "/page/mine/agent-product"
    },
        {
            key: "all",
            value_id: "app.not.review",
            icon: "../img/PM-5.png",
            url: "/page/mine/agent-product"
        },]
}