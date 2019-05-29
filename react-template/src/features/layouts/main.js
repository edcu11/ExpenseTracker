import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Main extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				Main
			{...this.props.children}
			</div>
			);
	}
}

Main.propTypes = {
	children: PropTypes.object.isRequired
};

export default Main;






