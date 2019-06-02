import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, message, Input, Drawer, Icon, Form, Row, Button, Col, Descriptions, Divider, Statistic } from 'antd';
import { CreateCategory } from './actions';
import { connect } from 'react-redux';


class CategoriesDrawer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		}
	}

	componentDidMount() {
	}

	closeModal = () => {
		this.setState({
			showModal: false
		})
	}

	openModal = () => {
		this.setState({
			showModal: true
		});
	}
	submit = () => {
		this.props.form.validateFields({ force: true }, (err, values) => {
			if (err)
				return;
			this.props.createCategory(values).then(() => {
				message.success(`Created Category Succesfully!`);
			}).catch(() => {
				message.error(`Error creating Category!`)
			});
			this.closeModal();
		});
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

	amountValidator = (rule, value, callback) => {
		if (!value > 0)
			callback('Amount must greater then 0');
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div>
				<Col span={12}>
					<Button style={{width:"100%"}} onClick={this.openModal}>
						Categories
                </Button>
				</Col>
				<Col>
					<Drawer
						destroyOnClose
						title="Add Category"
						width={320}
						onClose={this.closeModal}
						visible={this.state.showModal}
					>
						<Row gutter={16}>
							<Form layout="vertical">
								<Row gutter={16}>
									<Col>
										<Form.Item label="Category Name">
											{getFieldDecorator('name', {
												rules: [{
													required: true, message: 'username cannot be empty',
												}]
											})(
												<Input
													prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
													placeholder="name"
												/>
											)}
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item label={'Limit'}>
											{getFieldDecorator('expectedExpense', {
												rules: [{
													required: true, message: '',
												},
												{
													validator: this.amountValidator
												}]
											})(
												<InputNumber
													style={{ width: "100%" }}
													formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
													parser={value => value.replace(/\$\s?|(,*)/g, '')}
													size="large"
												/>
											)}
										</Form.Item>
									</Col>
								</Row>
							</Form>
							<Row gutter={16} type="flex" justify="center">
								<Col span={24}>
									<Col span={10} >
										<Button key="cancel" type="default" size="default" onClick={this.closeModal}>
											cancel
								</Button>
									</Col>
									<Col span={10} >
										<Button key="submit" type="primary" size="default" onClick={this.submit}>
											accept
								</Button>
									</Col>
								</Col>
							</Row>
						</Row>
						<Divider />
						<Row gutter={16}>
							<Descriptions
								column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
								bordered
								title="Categories"
								border
								size="small">
								{this.props.categories.map((category) => {
									let lastExpense = this.props.findLastCategoryExpense(category.id);
									lastExpense = lastExpense ? lastExpense : { categoryBalance: 0 };
									let iconData = this.getIconData(parseInt(category.expectedExpense) < parseInt(lastExpense.categoryBalance))
									return (<Descriptions.Item span={2} key={category.id} label={category.name}>
										{/* $ {category.expectedExpense} */}
										<Statistic
											title="Category Expense"
											value={lastExpense.categoryBalance}
											valueStyle={{ color: iconData.color, fontSize: "14px" }}
											suffix={`/ ${category.expectedExpense}`}
										/>
									</Descriptions.Item>)
								})}
							</Descriptions>
						</Row>
					</Drawer >
				</Col>
			</div>
		);
	}
}

CategoriesDrawer.propTypes = {
	expenses: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	findLastCategoryExpense: PropTypes.func.isRequired,
	createCategory: PropTypes.func.isRequired
};


function mapDispatchToProps(dispatch) {
	return {
		createCategory: (categoryData) => dispatch(CreateCategory(categoryData)),
	};
}

export default connect(null, mapDispatchToProps)(Form.create()(CategoriesDrawer));
