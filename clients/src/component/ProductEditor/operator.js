export default {
	steps: [{
		key: 1,
		title: "mine.product.basic",
		default_message: "基础信息",
		icon: ""
	}, {
		key: 2,
		title: "mine.product.picture",
		default_message: "产品引导图",
		icon: ""
	}, {
		key: 3,
		title: "mine.product.attributes",
		default_message: "产品属性",
		icon: ""
	}, {
		key: 4,
		title: "mine.product.param",
		default_message: "产品规格",
		icon: ""
	}, {
		key: 5,
		title: "mine.product.introduction",
		default_message: "产品介绍",
		icon: ""
	}, {
		key: 6,
		title: "mine.product.packaging",
		default_message: "包装参数",
		icon: ""
	}, {
		key: 7,
		title: "mine.product.transport",
		default_message: "运输要求",
		icon: ""
	}],
	introduceType: [{
		key: 1,
		is_select: false,
		value: "product.edite.descrip",
	}, {
		key: 2,
		is_select: false,
		value: "product.edite.feature",
	}, {
		key: 3,
		is_select: false,
		value: "product.edite.paramter",
	}, {
		key: 4,
		is_select: false,
		value: "product.edite.attention",
	}, {
		key: 5,
		is_select: false,
		value: "product.edite.application",
	}, {
		key: 6,
		is_select: false,
		value: "product.edite.details",
	}, {
		key: 7,
		is_select: false,
		value: "product.edite.size",
	}, ],
	contentType: [{
		key: 1,
		value: "product.edite.picture",
	}, {
		key: 2,
		value: "product.edite.text",
	}],
	product_ins: [{
		key: "length",
		name: "mine.product.instruct_length",
		type: 0,
		unit: ["mm", "cm", "m"]
	}, {
		key: "width",
		name: "mine.product.instruct_width",
		type: 0,
		unit: ["mm", "cm", "m"]
	}, {
		key: "height",
		name: "mine.product.instruct_height",
		type: 0,
		unit: ["mm", "cm", "m"]
	}, {
		key: "pack",
		name: "mine.product.instruct_pack",
		type: 1,
		unit: [{
			id: 1,
			value: ["mm", "cm", "m"]
		}, {
			id: 2,
			value: ["mm", "cm", "m"]
		}]
	}, {
		key: "special",
		name: "mine.product.instruct_special",
		type: 2,
		unit: [{
			key: 1,
			name: "mine.product.special_fragile"
		}, {
			key: 2,
			name: "mine.product.special_dust"
		}, {
			key: 3,
			name: "mine.product.special_liquid"
		}, {
			key: 4,
			name: "mine.product.special_corrosion"
		}]
	}, {
		key: "other",
		name: "mine.product.instruct_other",
		type: 3,
	}],
	transport: [{
		key: 1,
		value: "product.edite.transport.width"
	}, {
		key: 2,
		value: "product.edite.transport.length"
	}, {
		key: 3,
		value: "product.edite.transport.height"
	}]

}