import PropTypes from 'prop-types';
import { Col, Row, Icon, Skeleton, Avatar, List, Statistic, Timeline } from 'antd';
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
            descriptionIcons: [ "green", "red", "yellow", "red", "yellow"]
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
                    <Col lg={8} xs={12} md={12} sm={12}>
                        <Ellipsis length={35} tooltip>{this.props.expense.category.name}</Ellipsis>
                    </Col>
                    <Col lg={5} xs={12} md={12} sm={12} className="ExpenseCardTitle">
                        <Statistic
                            title="cantidad"
                            value={this.props.expense.amount}
                            precision={2}
                            valueStyle={{ color: '#71a9bc', fontSize: "21px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={'minus'}>L</Icon>}
                        />
                    </Col>
                    <Col className="ExpenseCardDescription" lg={5} xs={12} md={12} sm={12}>
                        <Statistic
                            title="Category Expense"
                            value={this.props.expense.categoryBalance}
                            precision={2}
                            valueStyle={{ color: iconData.color, fontSize: "21px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={iconData.moneyIcon}>L</Icon>}
                            suffix={`/ ${this.props.expense.category.expectedExpense}`}
                        />
                    </Col>
                    <Col className="ExpenseCardDescription" lg={5} xs={12} md={12} sm={12}>
                        <Statistic
                            title="Account Balance"
                            value={this.props.expense.balance}
                            precision={2}
                            valueStyle={{ color: balanceIcon.color, fontSize: "21px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={balanceIcon.moneyIcon}>L</Icon>}
                        />
                    </Col>
                    <Col lg={1} xs={2} md={2} sm={2} style={{ paddingTop: "3px" }}>
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
                <Timeline>
                    {this.props.expense.descriptions.map( (desc) => {
                        return <Timeline.Item key={desc.id} color={this.state.descriptionIcons[desc.type]} >{desc.description}</Timeline.Item>
                    })}
                </Timeline>
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
    account: PropTypes.object.isRequired,
    openEditModal: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    goToPage: (location) => { dispatch(push(location)); },
});

export default connect(null, mapDispatchToProps)(ExpenseCard);

