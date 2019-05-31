import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetExpenses, BeginExpenses, CreateExpense } from './actions';
import InfiniteScroll from 'react-infinite-scroller';
import { Col, message, Spin, List, Divider } from 'antd';
import ExpenseCard from './expenseCard';
import ExpenseModal from './expenseModal';
// import {GenerateReport} from '../../utils/reports';

var moment = require('moment');


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			hasMore: true,
			showExpenseModal: true,
			submitAction: this.createExpense,
			expenseData: {}
		}
	}

	componentDidMount() {
		this.props.beginExpenses(this.props.params.id).then(() => {
			this.setState({
				loading: false
			});
		});
	}

	buildAddModal = () => {
		const newExpenseData = { categoryId: 0, amount: 0, date: moment() }
		this.setState({
			showExpenseModal: true,
			submitAction: this.createExpense,
			expenseData: newExpenseData
		})
	}

	buildEditModal = (selectedAccount) => {
		this.setState({
			showExpenseModal: true,
			submitAction: this.editExpense,
			expenseData: selectedAccount
		});
	}

	defineBalances = (expense, lastExpense) => {
		expense.accountId = this.props.account.id;
		expense.balance = (lastExpense ? lastExpense.balance : this.props.account.initialAmount) - expense.amount;
		expense.categoryBalance = parseInt((lastExpense ? lastExpense.categoryBalance : 0)) + expense.amount;
	}


	createExpense = (expenseData) => {
		let lastExpense = this.findLastECategoryExpense(expenseData.categoryId);
		this.defineBalances(expenseData, lastExpense);
		// let descriptions = GenerateReport(expenseData, this.props.account, lastExpense);
		// console.log("after: ", expenseData, descriptions);
		return;
		// this.props.createExpense(expenseData, descriptions).then(() => {
		// 	message.success(`Created Succesfully!`);
		// }).catch(() => {
		// 	message.error(`Error creating Expense!`)
		// });
	}

				//(expenseData)
	editExpense = () => {
		// this.props.editExpense(expenseData, this.state.expenseData).then(() => {
		// 	message.success(`Edited Succesfully!`);
		// }).catch(() => {
		// 	message.error(`Error editing Expense!`)
		// });
	}

	closeExpenseModal = () => {
		// this.setState({
		// 	showExpenseModal: false,
		// })
	}

	handleInfiniteOnLoad = () => {
		if (!this.areThereMoreEntries()) {
			message.warning("All expenses have already been loaded");
			this.setHasMore(false);
			return;
		}
		this.props.getExpenses(this.props.params.id).then(() => {
			this.setState({
				loading: false
			})
		});

	}

	setHasMore = (val) => {
		this.setState({
			hasMore: val
		});
	}

	findLastECategoryExpense = (categoryId) => {
		return this.props.expenses.find((e) => {
			return e.categoryId === categoryId;
		});
	}

	areThereMoreEntries() {
		return this.props.expenses.length < this.props.expensesCount;
	}

	isDiffMonth = (index) => {
		if (index === 0)
			return true;
		let entry = this.props.expenses[index].date;
		let lastEntry = this.props.expenses[index - 1].date;
		return moment(lastEntry).isAfter(moment(entry), 'month');
	}

	getDivider = (index) => {
		if (this.isDiffMonth(index))
			return (
				<Divider dashed>
					{moment(this.props.expenses[index].date).format('MMMM')}
				</Divider>
			)
		return (<div></div>)
	}


	render() {
		return (
			<Col style={{ paddingLeft: "10px" }} xs={23} sm={23} md={23} lg={23} >
				<ExpenseModal
					expenseData={this.state.expenseData}
					showModal={this.state.showExpenseModal}
					submitExpense={this.state.submitAction}
					cancelModal={this.closeExpenseModal}
				/>
				<Spin spinning={this.state.loading}>
					<div className="entryList">
						<InfiniteScroll
							initialLoad={false}
							loadMore={this.handleInfiniteOnLoad}
							hasMore={!this.state.loading && this.state.hasMore}
							useWindow={false}
						>
							<List
								dataSource={this.props.expenses}
								renderItem={(item, index) => {
									let getDivider = this.getDivider(index);
									return (
										<Col span={24} >
											{getDivider}
											<ExpenseCard
												expense={item}
												account={this.props.account}
												openEditModal={() => { }}
											/>
											<Divider></Divider>
										</Col>
									)
								}}
							/>
						</InfiniteScroll>
					</div>
				</Spin>
			</Col>
		);
	}
}

Home.propTypes = {
	expenses: PropTypes.array.isRequired,
	account: PropTypes.object.isRequired,
	expensesCount: PropTypes.number.isRequired,
	params: PropTypes.object.isRequired,
	getExpenses: PropTypes.func.isRequired,
	beginExpenses: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		expenses: state.home.expenses,
		expensesCount: state.home.expensesCount,
		account: state.home.account
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beginExpenses: (id) => dispatch(BeginExpenses(id)),
		getExpenses: (id) => dispatch(GetExpenses(id)),
		createExpense: (expenseData, descriptions) => dispatch(CreateExpense(expenseData, descriptions))

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
