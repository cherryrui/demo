import React from 'react';
import css from './AccountSecurity.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import {
	FormattedMessage
} from 'react-intl';

class AccountSecurity extends React.Component {


	render() {

		return <div className={basecss.child_title}>
			账户安全
		</div>
	}
}

export default AccountSecurity;