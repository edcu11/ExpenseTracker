import PropTypes from 'prop-types';
import { Col, Row, Icon, Skeleton, Avatar, List, Statistic } from 'antd';
import { connect } from "react-redux";
import React from 'react';
import { push } from 'react-router-redux';
import moment from 'moment';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';


class ExpenseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showComplete: false,
        }
    }

    componentDidMount() {
    }

    ShowMoreIcon = () => {
        let iconType = "caret-left";
        if (this.state.showComplete)
            iconType = "caret-down";
        return (
            <Icon type={iconType} onClick={this.changeCardDisplay} />
        );
    }

    changeCardDisplay = () => {
        this.setState({
            showComplete: !this.state.showComplete
        });
    }

    getIconData = (condition) => {
        console.log("cond: ", condition);
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

    openEdit = () => {
        // this.props.openEditModal(this.props.expense, { id: this.props.expense.id, previousDate: this.props.expense.date});
    }

    displayTitle = (iconData) => {
        let balanceIcon = this.getIconData(parseInt(this.props.expense.balance) < 0);
        return (
            <div>
                <Row>
                    <Col lg={4} xs={6} md={6} sm={6}>
                        <Ellipsis length={35} tooltip>{this.props.expense.description}</Ellipsis>
                    </Col>
                    <Col lg={4} xs={2} md={2} sm={2}>
                        {/* <Button onClick={this.openEdit} size="small" type="dashed" shape="circle" icon="edit" /> */}
                        <Icon type="edit" onClick={this.openEdit}></Icon>
                    </Col>
                    <Col lg={4} xs={7} md={7} sm={5} className="ExpenseCardTitle">
                        <Statistic
                            title="cantidad"
                            value={this.props.expense.amount}
                            precision={2}
                            valueStyle={{ color: iconData.color, fontSize: "17px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={iconData.moneyIcon}>L</Icon>}
                        />
                    </Col>
                    <Col className="ExpenseCardDescription" lg={4} xs={7} md={7} sm={5}>
                        <Statistic
                            title="Category Expense"
                            value={this.props.expense.categoryBalance}
                            precision={2}
                            valueStyle={{ color: iconData.color, fontSize: "17px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={iconData.moneyIcon}>L</Icon>}
                            suffix={`/ ${this.props.expense.category.expectedExpense}`}
                        />
                    </Col>
                    <Col className="ExpenseCardDescription" lg={4} xs={7} md={7} sm={5}>
                        <Statistic
                            title="Account Balance"
                            value={this.props.expense.balance}
                            precision={2}
                            valueStyle={{ color: balanceIcon.color, fontSize: "17px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={balanceIcon.moneyIcon}>L</Icon>}
                        />
                    </Col>
                    <Col lg={2} xs={2} md={2} sm={2} style={{ paddingTop: "3px" }}>
                        <a>{this.ShowMoreIcon()}</a>
                    </Col>
                </Row>
            </div>
        )
    }

    displayCompleteData = () => {
        let formattedexpenseDate = moment(this.props.expense.date).format('YYYY/MM/DD');
        if (this.state.showComplete)
            return (
                <div>
                    <Row>
                        <Col span={24}>
                            ({formattedexpenseDate}): {this.props.expense.extraDetail}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}>
                            {this.props.intl.formatMessage({ ...messages.refNumber })}: {this.props.expense.referenceNumber}
                        </Col>
                    </Row>
                    <Row >
                        {this.displayDetails()}
                    </Row>
                </div>
            )
        return (<div>
            {formattedexpenseDate}

        </div>)
    }

    displayDetails() {
        return (
            <div>description</div>
        );
    }

    render() {
        let iconData = this.getIconData(parseInt(this.props.expense.categoryBalance) > parseInt(this.props.expense.category.expectedExpense));

        console.log("Vals: ", this.props.expense.categoryBalance ,"<", this.props.expense.category.expectedExpense, ": ", iconData)
        return (
            <div className="ExpenseCard">
                <List.Item onDoubleClick={this.changeCardDisplay}>
                    <Skeleton avatar title={false} loading={this.state.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar icon={iconData.icon} shape="circle" style={{ backgroundColor: iconData.color }} />}
                            title={this.displayTitle(iconData)}
                            description={this.displayCompleteData(iconData)}
                        />
                    </Skeleton>
                </List.Item>
            </div>
        )
    }
}

ExpenseCard.propTypes = {
    expense: PropTypes.object.isRequired,
    openEditModal: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    goToPage: (location) => { dispatch(push(location)); },
});

export default connect(null, mapDispatchToProps)(ExpenseCard);

