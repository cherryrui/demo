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
			current: 4,
			product: {
				productId: 76
			},
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
		if (step == -1) {
			this.setState({
				current: this.state.current + step,
				product: product
			})
		} else {
			let next = this.state.current + step;
			if (next > operator.steps.length - 1) {
				next = 0;
				this.state.product = {};
			} else {
				this.state.product = product
			}
			this.setState({
				current: next,
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
	handleLogin = () => {
		this.setState({
			visible: true
		})
	}


	render() {
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
			<Steps steps={operator.steps} current={this.state.current}/>
			<div className={css.body}>
				{this.state.current==0?<ProductBasic product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==1?<ProductPicture product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==2?<ProductAttr product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==3?<ProductSpec product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==4?<ProductInfo product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==5?<ProductInstruct product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:this.state.current==6?<ProductInstruct product={this.state.product} handleSteps={this.handleSteps} login={this.handleLogin}/>
				:""
			}	
			</div>
			<LoginModal visible={this.state.visible} reload={this.state.reload} closeModal={this.handleCancel}/>
		</div>
	}

}
export default injectIntl(ProductEditor);