import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetExpenses, BeginExpenses } from './actions';
import InfiniteScroll from 'react-infinite-scroller';
import { Col, message, Spin, List, Divider } from 'antd';
var moment = require('moment');


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			hasMore: true,
		}
	}

	componentDidMount() {
		this.props.beginExpenses(this.props.params.id).then( () => {
			this.setState({
				loading: false
			})
		});
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
			<Col xs={23} sm={16} md={16} lg={10} >
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
											{item.description}
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
	expensesCount: PropTypes.number.isRequired,
	params: PropTypes.object.isRequired,
	getExpenses: PropTypes.func.isRequired,
	beginExpenses: PropTypes.func.isRequired

};

const mapStateToProps = (state) => {
	return {
		expenses: state.home.expenses,
		expensesCount: state.home.expensesCount,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		beginExpenses: (id) => dispatch(BeginExpenses(id)),
		getExpenses: (id) => dispatch(GetExpenses(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
