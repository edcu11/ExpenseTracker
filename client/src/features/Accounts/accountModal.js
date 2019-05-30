import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GetAccounts, SelectAccount } from './actions';
import { InputNumber, Input, Modal, Icon, Col, Form, Row, Button } from 'antd';

class AccountModal extends Component {
	constructor(props) {
		super(props);
		//<Icon type="user-add" />
		this.state = {

		}
	}

	componentDidMount() {
	}

	closeModal = () => {
		this.props.cancelModal();
	}

	submit = () => {
		this.props.form.validateFields({ force: true }, (err, values) => {
			if (err)
				return;
			this.props.submitAccount(values);
			this.closeModal();
		});

	}


	amountValidator = (rule, value, callback) => {
		if (!value > 0)
			callback('Amount must greater then 0');
		callback();
	}

	render() {
		console.log("modal: ", this.props);
		const { getFieldDecorator } = this.props.form;

		return (
			<Modal
				title="Accounts"
				destroyOnClose
				visible={this.props.showModal}
				maskClosable={false}
				onCancel={this.closeModal}
				footer={
					<div>
						<Button key="cancel" type="default" size="default" onClick={this.closeModal}>
							CANCEL
						</Button>
						<Button key="submit" type="primary" size="default" onClick={this.submit}>
							ACCEPT
						</Button>
					</div>
				}
				className="addEntryModal"
			>
				<Form>
					<Row>
						<Form.Item label="Username">
							{getFieldDecorator('username', {
								rules: [{
									required: true, message: 'username cannot be empty',
								}],
								initialValue: this.props.accountData.username
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Username"
								/>
							)}
						</Form.Item>
					</Row>
					<Row>
						<Form.Item label={'Account money'}>
							{getFieldDecorator('initialAmount', {
								rules: [{
									required: true, message: '',
								},
								{
									validator: this.amountValidator
								}],
								initialValue: this.props.accountData.initialAmount,
							})(
								<InputNumber
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
									size="large"
								/>
							)}
						</Form.Item>
					</Row>
				</Form>


			</Modal>
		);
	}
}

AccountModal.propTypes = {
	accountData: PropTypes.object,
	showModal: PropTypes.bool.isRequired,
	submitAccount: PropTypes.func.isRequired,
	cancelModal: PropTypes.func.isRequired

};

export default (Form.create()(AccountModal));
