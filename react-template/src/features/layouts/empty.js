import React, {Component} from 'react';
import PropTypes from 'prop-types';

// main layout imports
import {Layout} from 'antd';
const {Content} = Layout;

class Empty extends Component {
	render() {
		return (
			<Layout className="mainLayout">
				<Content className="content">
					{this.props.children}
				</Content>
			</Layout>
			);
	}
}

Empty.propTypes = {
	children: PropTypes.object.isRequired,
};

export default Empty;