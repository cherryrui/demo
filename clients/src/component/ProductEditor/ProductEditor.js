import React from 'react';
import css from './ProductEditor.scss';
import basecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import Steps from '../Public/Steps/Steps.js';
import ProductBasic from './ProductBasic.js';
import ProductPicture from './ProductPicture.js';
import ProductAttr from './ProductAttr.js';
import ProductSpec from './ProductSpec.js';
import ProductInfo from './ProductInfo.js';
import ProductInstruct from './ProductInstruct.js';
import ProductTransport from './ProductTransport.js';
import LoginModal from '../Public/LoginModal/LoginModal.js'
import axios from 'axios';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Link
} from 'react-router';
import {
	Breadcrumb
} from 'antd';

class ProductEditor extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.params.id ? 6 : 0,
			now: this.props.params.id ? 6 : 0,
			product: props.params.id ? {
				productId: props.params.id
			} : null,
			visible: false,
			reload: false,
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
		console.log(step, product)
		if (step == -1) {
			this.setState({
				now: this.state.now + step,
			})
		} else {
			let next = this.state.now + step;
			if (next > operator.steps.length - 1) {
				this.props.history.pushState(null, 'page/mine');
				this.state.product = {};
			} else {
				this.state.product = product
			}
			this.setState({
				current: next,
				now: next,
			}, () => {
				document.body.scrollTop = 0
			})
		}

	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	handleLogin = (status) => {
		this.setState({
			visible: true,
			reload: status ? true : false
		})
	}
	changeStep = (step) => {
		this.setState({
			now: step
		})
	}
	render() {
		console.log(this.state.product);
		return <div ref={(product_edit)=>{this.product_edit = product_edit}} className={appcss.body}>
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>" style={{marginBottom: "10px"}}>
                    <Breadcrumb.Item >
                        <Link to='page/mine'>
                            <FormattedMessage id="mine.person" defaultMessage="首页"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="mine.product.upload" defaultMessage="供应商"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
			<Steps steps={operator.steps} now={this.state.now} changeStep={this.changeStep} current={this.state.current}/>
			<div className={css.body}>
		{
			this.state.now == 0 ? <ProductBasic product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==1?<ProductPicture before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==2?<ProductAttr before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==3?<ProductSpec before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==4?<ProductInfo before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==5?<ProductInstruct before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.now==6?<ProductTransport before product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:""
			}	
			</div>
			<LoginModal visible={this.state.visible} reload={this.state.reload} closeModal={this.handleCancel}/>
		</div>
	}

}
export default injectIntl(ProductEditor);