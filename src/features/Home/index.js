import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: 13
		}
	}

	componentDidMount() {
		console.log("thos: ", this.props);
        // this.props.fetchData().then(() => {
        //     this.setState({ loading: false });
        // });
        // this.props.getAccounts();
	}
	
	changeText = () => {
		this.setState({
			result: 99
		});
		this.props.actions.saveFuelSavings();
	}
	

	render() {
		console.log("state: ", this.state, this.props);
		return (
			<div>
				Home Page amigos
				<button onClick={this.changeText} > adios { this.state.result } </button>
			</div>
		);
	}
}

Home.propTypes = {
	clients: PropTypes.object.isRequired,
	otros: PropTypes.number.isRequired,
	actions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	console.log("state: ", state);
	return {
		clients: state.home.clients,
		otros: state.home.otro
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
