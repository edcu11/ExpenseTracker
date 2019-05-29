import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetExpenses, BeginExpenses } from './actions';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		console.log("thos: ", this.props);

		this.props.beginExpenses().then((expensesList) => {
			console.log("expenses: ", expensesList)
		});
	}

	changeText = () => {
		console.log("state: ", this.state, "\n props: ", this.props);
	}


	render() {
		return (
			<div>
				Home Page amigos
				<button onClick={this.changeText} > adios {this.state.result} </button>
			</div>
		);
	}
}

Home.propTypes = {
	expenses: PropTypes.array.isRequired,
	expensesCount: PropTypes.number.isRequired,
	getExpenses: PropTypes.func.isRequired,
	beginExpenses: PropTypes.func.isRequired

};

const mapStateToProps = (state) => {
	console.log("state: ", state);
	return {
		expenses: state.home.expenses,
		expensesCount: state.home.expensesCount
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beginExpenses: () => dispatch(BeginExpenses()),
		getExpenses: () => dispatch(GetExpenses())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
