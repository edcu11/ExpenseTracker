import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Affix, Menu, Icon } from 'antd';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// main layout imports
import { Layout } from 'antd';
const { Content } = Layout;

class Empty extends Component {

	handleClick = (item) => {
		console.log("item: ", item, this);
		let view = (item.key == "home") ? "" : item.key;
		this.props.goToPage(`/${view}`);
	};

	getTopMenu() {
		return (
			<Menu onClick={this.handleClick} mode="horizontal">
				<Menu.Item key="about">
					<Icon type="appstore" />
					Accounts
			  	</Menu.Item>
				<Menu.Item key="expenses">
					<Icon type="bank" />
					Expenses
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
