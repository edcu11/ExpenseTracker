import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Layout } from 'antd';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// main layout imports
const { Content } = Layout;

class Empty extends Component {

	handleClick = (item) => {
		let view = (item.key == "home") ? "" : item.key;
		this.props.goToPage(`/${view}`);
	};

	getTopMenu() {
		if (location.pathname.localeCompare("/accounts"))
			return (
				<Menu onClick={this.handleClick} mode="horizontal">
					<Menu.Item key="accounts">
						<Icon type="appstore" />
						Accounts
				</Menu.Item>
				</Menu>
			);
	}


	render() {
		return (
			<Layout className="mainLayout">
				<Content className="content">
					{this.getTopMenu()}
					{this.props.children}
				</Content>
			</Layout>
		);
	}
}

Empty.propTypes = {
	children: PropTypes.object.isRequired,
	goToPage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		goToPage: (location) => {
			dispatch(push(location));
		}
	};
};

export default connect(null, mapDispatchToProps)(Empty);
