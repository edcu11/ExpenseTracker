import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

class NotFound extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Empty />
		);
	}
}

NotFound.propTypes = {
};

export default NotFound;