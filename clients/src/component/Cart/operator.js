export default {
    //付款方式
    pay_mode: [
        {key:1,value_id: "cart.pay.full"},
        {key:2,value_id: "cart.pay.instalment"},
    ],
    //预付方式
    advance_mode: [
        {key:1,value_id: "cart.advance.20"},
        {key:2,value_id: "cart.advance.30"},
        {key:3,value_id: "cart.advance.40"},
    ],
    //分期方式
    instalment_mode: [
        {key:1,num:3,rate:"3%",descrip_id:"cart.instalment.descrip"},
        {key:2,num:6,rate:"3%",descrip_id:"cart.instalment.descrip"},
        {key:3,num:9,rate:"3%",descrip_id:"cart.instalment.descrip"},
        {key:4,num:12,rate:"3%",descrip_id:"cart.instalment.descrip"},
    ],
    //提货方式
    delivery_mode: [
        {key:1,value_id: "cart.delivery.take"},
        {key:2,value_id: "cart.delivery.home"},
    ],
    steps:[
        {
            key: 1,
            title: "cart.cart",
            default_message: "我的购物车",
            icon: ""
        },{
            key: 2,
            title: "cart.confirm.order",
            default_message: "我的购物车",
            icon: ""
        },{
            key: 3,
            title: "cart.pay",
            default_message: "我的购物车",
            icon: ""
        },{
            key: 4,
            title: "cart.payment",
            default_message: "我的购物车",
            icon: ""
        },
    ]

}