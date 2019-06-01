import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Input, Drawer, Icon, Form, Row, Button, Col, Descriptions, Divider } from 'antd';
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
			this.props.createCategory(values);
			this.closeModal();
		});

	}


	amountValidator = (rule, value, callback) => {
		if (!value > 0)
			callback('Amount must greater then 0');
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Col span={12}>
				<Button onClick={this.openModal}>
					Categories
                </Button>
				<Drawer
					title="Add Category"
					width={520}
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
						<Row gutter={16}>
							<Col span={12}>
								<Col span={10} >
									<Button style={{ width: '100%' }} key="cancel" type="default" size="default" onClick={this.closeModal}>
										cancel
								</Button>
								</Col>
								<Col span={10} >
									<Button style={{ width: '140%' }} key="submit" type="primary" size="default" onClick={this.submit}>
										accept
								</Button>
								</Col>
							</Col>
						</Row>
					</Row>
					<Divider/>
					<Row gutter={16}>
						<Descriptions bordered title="Categories" border column={1} size={this.state.size}>
							{this.props.categories.map( (category) => {
								return <Descriptions.Item key={category.id} label={category.name}> {category.expectedExpense} </Descriptions.Item>
							})}
						</Descriptions>
					</Row>
				</Drawer >
			</Col>

		);
	}
}

CategoriesDrawer.propTypes = {
	categories: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => {
// 	return {
// 		categories: state.categories.categories,
// 	};
// }

function mapDispatchToProps(dispatch) {
	return {
		getCategories: () => dispatch(GetCategories()),
		createCategory: (categoryData) => dispatch(CreateCategory(categoryData)),
	};
}

export default connect(null, mapDispatchToProps)(Form.create()(CategoriesDrawer));
