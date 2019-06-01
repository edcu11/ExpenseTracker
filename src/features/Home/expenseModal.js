import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputNumber, DatePicker, Modal, Col, Select, Form, Row, Button } from 'antd';
var moment = require('moment');
const dateFormat = 'YYYY/MM/DD';

class ExpenseModal extends Component {
    constructor(props) {
        super(props);
        //<Icon type="user-add" />
        this.state = {
            showExpenseModal: false
        }
    }

    componentDidMount() {

    }

    closeModal = () => {
        this.setState({
            showExpenseModal: false
        })
    }

    openModal = () => {
        this.setState({
            showExpenseModal: true
        });
    }

    submit = () => {
        this.props.form.validateFields({ force: true }, (err, values) => {
            if (err)
                return;
            this.props.submitExpense(values);
            this.closeModal();
        });

    }

    amountValidator = (rule, value, callback) => {
        if (!value > 0)
            callback('Amount must greater then 0');
        callback();
    }

    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Col span={12}>
                <Button onClick={this.openModal}>
                    Add Expense
                </Button>
                <Modal
                    title="New Expense"
                    destroyOnClose
                    visible={this.state.showExpenseModal}
                    maskClosable={false}
                    onCancel={this.closeModal}
                    footer={
                        <div>
                            <Button key="cancel" type="default" size="default" onClick={this.closeModal}>
                                cancel
						</Button>
                            <Button key="submit" type="primary" size="default" onClick={this.submit}>
                                accept
						</Button>
                        </div>
                    }
                    className="addEntryModal"
                >
                    <Form>
                        <Row>
                            <Col span={12}>
                                <Form.Item>
                                    {getFieldDecorator(`categoryId`, {
                                        rules: [{
                                            required: true, message: 'Category must be selected',
                                        }],
                                        initialValue: this.props.expenseData.category
                                    })(

                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Select a category"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.props.categories.map((cat) =>
                                                <Select.Option key={cat.id} value={cat.id}> {cat.name} </Select.Option>)}

                                        </Select>
                                    )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item label={'Amount Spent'}>
                                    {getFieldDecorator('amount', {
                                        rules: [{
                                            required: true, message: 'Amount must be greater then 0',
                                        },
                                        {
                                            validator: this.amountValidator
                                        }],
                                        initialValue: this.props.expenseData.initialAmount,
                                    })(
                                        <InputNumber
                                            style={{width:"90%"}}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            size="large"
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label='Date'>
                                    {getFieldDecorator('date', {
                                        rules: [{
                                            required: true, message: 'Invalid Date',
                                        }],
                                        initialValue: moment(this.props.expenseData.date)
                                    })(
                                        <DatePicker disabledDate={this.disabledDate} format={dateFormat} />
                                    )}
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>

                </Modal>
            </Col>
        );
    }
}

ExpenseModal.propTypes = {
    expenseData: PropTypes.object,
    categories: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    submitExpense: PropTypes.func.isRequired,
    cancelModal: PropTypes.func.isRequired,
};


// const mapStateToProps = (state) => {
//     return {
//         expenses: state.home.expenses,
//         expensesCount: state.home.expensesCount,
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//     };
// }

export default connect(null, null)(Form.create()(ExpenseModal));

