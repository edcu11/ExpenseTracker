import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetAccounts, CreateAccount, EditAccount, DeleteAccount } from './actions';
import { List, Statistic, Card, Icon, Col, message, Modal } from 'antd';
import { getAvatars } from '../../utils/images';
import addImage from '../../images/add.png';
import AccountModal from './accountModal';
import { push } from 'react-router-redux';

const confirm = Modal.confirm;

class AccountsPage extends Component {
	constructor(props) {
		super(props);
		//<Icon type="user-add" />
		this.state = {
			showDeleteModal: false,
			showCreateModal: false,
			avatars: getAvatars(),
			submitAction: this.createAccount,
			accountData: {}
		}
	}

	componentDidMount() {
		this.props.getAccounts();
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
		let iconData = this.getIconData(user.balance < user.initialAmount * 0.10);
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

	handleCardPick = (account) => {
		// console.log("my props: ", this.props);
		this.props.goToPage(`/accounts/${account.id}`);
	}

	showAddModal = () => {
		const newAccountData = { username: "", initialAmount: 0 }
		this.setState({
			showCreateModal: true,
			submitAction: this.createAccount,
			accountData: newAccountData
		})
	}

	showEditModal = (selectedAccount) => {
		this.setState({
			showCreateModal: true,
			submitAction: this.editAccount,
			accountData: selectedAccount
		});
	}

	createAccount = (accountData) => {
		accountData.balance = accountData.initialAmount;
		this.props.createAccount(accountData).then(() => {
			message.success(`Created Succesfully!`);
		}).catch(() => {
			message.error(`Error creating account!`)
		});
	}

	editAccount = (accountData) => {
		this.props.editAccount(accountData, this.state.accountData).then(() => {
			message.success(`Edited Succesfully!`);
		}).catch(() => {
			message.error(`Error editing account!`)
		});
	}

	closeAccountModal = () => {
		this.setState({
			showCreateModal: false,
		})
	}

	showDeleteConfirm = (item) => {
		let deleteConfirm = this.props.deleteAccount;

		confirm({
			title: `Should ${item.username} be deleted`,
			content: 'All related expenses will be deleted',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteConfirm(item.id)
			},
			onCancel() {

			},
		});
	}



	render() {
		let dataSource = this.props.accounts ? this.props.accounts : [];
		return (
			<div>
				<AccountModal
					showModal={this.state.showCreateModal}
					accountData={this.state.accountData}
					submitAccount={this.state.submitAction}
					cancelModal={this.closeAccountModal}
				/>
				<Col lg={22} xs={22} md={22} sm={22}>
					<List
						grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
						dataSource={dataSource}
						renderItem={(item, index) => (
							<List.Item onClick={() => this.handleCardPick(item)}>
								<Card
									bordered
									hoverable
									style={{ width: 200, height: 200 }}
									actions={[
										<a key="action" onClick={() => { return this.showEditModal(item) }} > <Icon type="edit" theme="outlined" /></a>,
										<a key="action" onClick={() => { return this.showDeleteConfirm(item) }} >  <Icon type="delete" theme="outlined" /></a>,
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
	createAccount: PropTypes.func.isRequired,
	editAccount: PropTypes.func.isRequired,
	goToPage: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		accounts: state.accounts.accounts,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAccounts: () => dispatch(GetAccounts()),
		createAccount: (data) => dispatch(CreateAccount(data)),
		editAccount: (data, oldData) => dispatch(EditAccount(data, oldData)),
		deleteAccount: (id) => dispatch(DeleteAccount(id)),
		goToPage: (location) => { dispatch(push(location)); }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
