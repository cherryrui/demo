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
import ProductInstruct from './ProductInstruct.js';
import axios from 'axios';
import lrz from 'lrz';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';

class ProductEditor extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			product: {}
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
	handleSteps = (step, product) => {
		if (step == -1) {
			axios.get(`/product/get-product-info-byid.json?id=${this.state.product.id}`).then(res => {
				this.setState({
					current: this.state.current + step,
					product: res.data.product
				})
			})
		} else {
			let next = this.state.current + step;
			if (this.state.current == 0) {
				this.state.product = product
			}
			if (next > operator.steps.length - 1) {
				next = 0;
				this.state.product = {};
			}
			this.setState({
				current: next,
			}, () => {
				document.body.scrollTop = 0
			})
		}

	}


	render() {
		return <div ref={(product_edit)=>{this.product_edit = product_edit}}>
			<div className={basecss.child_title}>
				<FormattedMessage id="mine.product.upload" defaultMessage="上传产品"/> 
			</div>
			<Steps steps={operator.steps} current={this.state.current}/>
			<div className={css.body}>
				{this.state.current==0?<ProductBasic product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==1?<ProductAttr product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==2?<ProductSpec product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==3?<ProductInfo product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==4?<ProductInstruct product={this.state.product} handleSteps={this.handleSteps}/>
				:""
			}	
			</div>
			
		</div>
	}

}
export default injectIntl(ProductEditor);