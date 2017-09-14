import React from 'react';
import css from './ProductEditor.scss';
import basecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import Steps from '../Public/Steps/Steps.js';
import ProductBasic from './ProductBasic.js';
import ProductAttr from './ProductAttr.js';
import ProductSpec from './ProductSpec.js';
import ProductInfo from './ProductInfo.js';
import axios from 'axios';
import lrz from 'lrz';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Form,
	Icon,
	Input,
	Button,
	Checkbox,
	message,
	Upload,
	InputNumber,
	Select,
	Cascader,
	Modal,
	Radio,
	Tooltip
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class ProductEditor extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			current: 2,
			product: {
				id: 1,
				category: [{
					id: 1,
					name: "Tool",
					isLeaf: false
				}, {
					id: 2,
					name: "dev tool",
					isLeaf: false
				}, {
					id: 3,
					name: "sdad",
					isLeaf: false
				}, ]

			},
		}
	}

	componentDidMount() {
		/*this.product_edit.scrollIntoView();*/
		document.body.scrollTop = 0
	}

	/**
	 * 进入下一步骤，step，步骤序号，pro，产品
	 * @param  {[type]} step 1:下一步，-1上一步
	 */
	handleSteps = (step, pro) => {
		console.log("handleSteps", step, pro)
			/*let product = step == 1 ? pro : this.state.product;*/
		this.setState({
			current: this.state.current + step,
		}, () => {
			/*this.product_edit.scrollIntoView();*/
			document.body.scrollTop = 0
		})


	}


	render() {
		return <div ref={(product_edit)=>{this.product_edit = product_edit}}>
			<div className={basecss.child_title}>
				<FormattedMessage id="mine.product.upload" defaultMessage="上传产品"/>&nbsp;: 
			</div>
			<Steps steps={operator.steps} current={this.state.current}/>
			<div className={css.body}>
				{this.state.current==0?<ProductBasic handleSteps={this.handleSteps}/>
				:this.state.current==1?<ProductAttr product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==2?<ProductSpec handleSteps={this.handleSteps}/>
				:this.state.current==3?<ProductInfo handleSteps={this.handleSteps}/>
				:""
			}	
			</div>
			
		</div>
	}

}
export default injectIntl(ProductEditor);