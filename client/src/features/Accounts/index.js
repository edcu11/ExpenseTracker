import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetAccounts, SelectAccount } from './actions';
import { List, Statistic, Card, Icon, Col, Avatar, Tag, Row, Button } from 'antd';
import { getAvatars } from '../../utils/images';
import addImage from '../../images/add.png';

class AccountsPage extends Component {
	constructor(props) {
		super(props);
		//<Icon type="user-add" />
		this.state = {
			showDeleteModal: false,
			showCreateModal: false,
			avatars: getAvatars(),
			submitAction: this.createAccount
		}
	}


	componentDidMount() {
		this.props.getAccounts().then(() => {
			console.log("ACCOUTNS:", this.props);
		});
	}

	handleClick = () => {
		console.log("Acco: ", this.props);
	}

	getIconData = (condition) => {
		let icon = "arrow-up";
		let moneyIcon = "caret-up";
		let iconColor = '#87d068';
		if (condition) {
			iconColor = '#f4a442';
			icon = "arrow-down";
			moneyIcon = "caret-down";
		}
		return { icon: icon, moneyIcon: moneyIcon, color: iconColor }
	}

	getBalanceStatistic = (user) => {
		let iconData = this.getIconData(user.balance < user.intialAmount * 0.10);
		return (
			<Col className="entryCardDescription">
				<Statistic
					title="balance"
					value={user.balance}
					precision={2}
					valueStyle={{ color: iconData.color, fontSize: "17px" }}
					prefix={<Icon viewBox="0 0 1024 1024" type={iconData.moneyIcon}>$</Icon>}
				/>
			</Col>
		)
	}

	getIndexAvatar = (index) => {
		return <img src={this.state.avatars[index]} alt="Logo" />
	}

	handleCardPick = (id) => {
		// console.log("my props: ", this.props);
		this.props.selectAccount(id);
	}

	showAddModal = () => {
		console.log("add modal: ", this.props);
		this.setState({
			showCreateModal: true,
			submitAction: this.createAccount
		})
	}

	createAccount = (accountData) => {
		this.props.createAccoun(accountData).then(() => {
			this.completeSubmit();
			message.success(`Created Succesfully!`);
		}).catch(() => {
			message.error(`Error creating account!`)
		});
	}



	render() {
		let dataSource = this.props.accounts ? this.props.accounts : [];
		console.log("datasour: ", dataSource);

		return (
			<div>
				<Col lg={22} xs={22} md={22} sm={22}>
					<List
						grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
						dataSource={dataSource}
						renderItem={(item, index) => (
							<List.Item onDoubleClick={() => this.handleCardPick(item.id)}>
								<Card
									bordered
									hoverable
									style={{ width: 200, height: 200 }}
									actions={[
										<a key="action" onClick={() => { return this.showDeleteModal() }} > <Icon type="edit" theme="outlined" /></a>,
										<a key="action" onClick={() => { return this.showEditModal() }} >  <Icon type="delete" theme="outlined" /></a>,
									]}
									cover={this.getIndexAvatar(index)}
								>
									<Card.Meta title={item.username} description={this.getBalanceStatistic(item)} />
								</Card>
							</List.Item>
						)}
					/>
				</Col>
				<Col span={2}>
					<Card
						bordered
						hoverable
						style={{ width: 200, height: 200 }}
						cover={<img src={addImage} onClick={() => this.showAddModal()} />}
					>
					</Card>
				</Col>
			</div>
		);
	}
}

AccountsPage.propTypes = {
	accounts: PropTypes.array.isRequired,
	getAccounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		accounts: state.accounts.accounts,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAccounts: () => dispatch(GetAccounts()),
		selectAccount: (id) => dispatch(SelectAccount(id))

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
