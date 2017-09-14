export default {
	steps: [{
		key: 1,
		title: "mine.product.basic",
		default_message: "基础信息",
		icon: ""
	}, {
		key: 2,
		title: "mine.product.attributes",
		default_message: "产品属性",
		icon: ""
	}, {
		key: 3,
		title: "mine.product.param",
		default_message: "产品规格",
		icon: ""
	}, {
		key: 4,
		title: "mine.product.introduction",
		default_message: "产品介绍",
		icon: ""
	}, {
		key: 5,
		title: "mine.product.packaging",
		default_message: "包装参数",
		icon: ""
	}],
	unit_list: [{
		key: "mine.product.unit_tai",
		value: "台"
	}, {
		key: "mine.product.unit_jian",
		value: "件"
	}, {
		key: "mine.product.unit_xiang",
		value: "箱"
	}, ],
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
	}]

}