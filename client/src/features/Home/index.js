import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetExpenses, BeginExpenses } from './actions';



class Home extends Component {
	constructor(props) {
		super(props);
	
	}

	componentDidMount() {
		this.props.beginExpenses();
	}

	changeText = () => {
		console.log("home props: ", this.props)
	}

	render() {
		return (
			<div>
				Home amigos
				<button onClick={this.changeText} > adios  </button>
			</div>
		);
	}
}

Home.propTypes = {
	expenses: PropTypes.array.isRequired,
	expensesCount: PropTypes.number.isRequired,
	account: PropTypes.number.isRequired,
	getExpenses: PropTypes.func.isRequired,
	beginExpenses: PropTypes.func.isRequired

};

const mapStateToProps = (state) => {
	return {
		expenses: state.home.expenses,
		expensesCount: state.home.expensesCount,
		account: state.accounts.accountId
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beginExpenses: () => dispatch(BeginExpenses()),
		getExpenses: () => dispatch(GetExpenses())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
