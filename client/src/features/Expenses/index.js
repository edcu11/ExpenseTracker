import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetExpenses, BeginExpenses, CreateExpense, FindCategory, GetCategories } from './actions';
import InfiniteScroll from 'react-infinite-scroller';
import { Col, message, Spin, List, Divider, Row } from 'antd';
import ExpenseCard from './expenseCard';
import ExpenseModal from './expenseModal';
import { GenerateReport } from '../../utils/reports';
import CategoriesDrawer from './categoriesModal';

var moment = require('moment');


class Expenses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			hasMore: true,
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
			submitAction: this.createExpense,
			expenseData: newExpenseData
		})
	}

	buildEditModal = (selectedAccount) => {
		this.setState({
			submitAction: this.editExpense,
			expenseData: selectedAccount
		});
	}

	defineBalances = (expense, lastExpense) => {
		expense.accountId = this.props.account.id;
		expense.balance = parseInt(this.props.expenses.length < 1 ? this.props.account.initialAmount : this.props.expenses[0].balance) - expense.amount;
		expense.categoryBalance = parseInt((lastExpense ? lastExpense.categoryBalance : 0)) + expense.amount;
	}

	findLastCategoryExpense = (categoryId) => {
		return this.props.expenses.find((e) => {
			return e.categoryId === categoryId;
		});
	}

	createExpense = (expenseData) => {
		expenseData.date = moment();
		let lastExpense = this.findLastCategoryExpense(expenseData.categoryId);
		this.defineBalances(expenseData, lastExpense);
		let descriptions = GenerateReport(expenseData, this.props.account, this.props.findCategory(expenseData.categoryId));
		// console.log("Expense:", expenseData, descriptions);
		this.props.createExpense(expenseData, descriptions).then(() => {
			message.success(`Created Succesfully!`);
		}).catch(() => {
			message.error(`Error creating Expense!`)
		});
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
		this.setState({
			showExpenseModal: false,
		})
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

	areThereMoreEntries() {
		return this.props.expenses.length < this.props.expensesCount;
	}

	isDiffDay = (index) => {
		if (index === 0)
			return true;
		let entry = this.props.expenses[index].date;
		let lastEntry = this.props.expenses[index - 1].date;
		return moment(lastEntry).isAfter(moment(entry), 'day');
	}

	getDivider = (index) => {
		if (this.isDiffDay(index))
			return (
				<Divider dashed>
					{moment(this.props.expenses[index].date).format('dddd, MMMM Do')}
				</Divider>
			)
		return (<div></div>)
	}

	render() {
		return (
			<Col style={{ paddingLeft: "10px" }} xs={23} sm={23} md={23} lg={23} >
				<Row gutter={16} type="flex" justify="center">
					<Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 20 }} lg={{ span: 20 }} xl={{ span: 20 }} >
						<ExpenseModal
							expenseData={this.state.expenseData}
							showModal={this.state.showExpenseModal}
							submitExpense={this.state.submitAction}
							cancelModal={this.closeExpenseModal}
							categories={this.props.categories}
						/>
						<CategoriesDrawer
							categories={this.props.categories}
							expenses={this.props.expenses}
							findLastCategoryExpense={this.findLastCategoryExpense}
						/>
					</Col>
				</Row>
				<Row>
					<Spin spinning={this.state.loading}>
						<div className="entryList">
							<InfiniteScroll
								initialLoad={false}
								loadMore={this.handleInfiniteOnLoad}
								hasMore={!this.state.loading && this.state.hasMore}
								useWindow={false}
							>
								<List
									className="expensesList"
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
				</Row>
			</Col>
		);
	}
}

Expenses.propTypes = {
	expenses: PropTypes.array.isRequired,
	account: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
	expensesCount: PropTypes.number.isRequired,
	params: PropTypes.object.isRequired,
	getExpenses: PropTypes.func.isRequired,
	beginExpenses: PropTypes.func.isRequired,
	findCategory: PropTypes.func.isRequired,
	getCategories: PropTypes.func.isRequired,
	createExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		expenses: state.expenses.expenses,
		expensesCount: state.expenses.expensesCount,
		account: state.expenses.account,
		categories: state.expenses.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beginExpenses: (id) => dispatch(BeginExpenses(id)),
		getExpenses: (id) => dispatch(GetExpenses(id)),
		createExpense: (expenseData, descriptions) => dispatch(CreateExpense(expenseData, descriptions)),
		findCategory: (id) => dispatch(FindCategory(id)),
		getCategories: () => dispatch(GetCategories())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
