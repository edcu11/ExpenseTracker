import PropTypes from 'prop-types';
import { Col, Row, Icon, Skeleton, Avatar, List, Statistic } from 'antd';
import { connect } from "react-redux";
import React from 'react';
import { push } from 'react-router-redux';
import moment from 'moment';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

let reportMessages = getReportMessages(),
    incomeMessages = getIncomeMessages()

const messages = {
    ...reportMessages,
    ...incomeMessages
};

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
        let iconColor = '#f4a442';
        let icon = "arrow-down";
        let moneyIcon = "caret-down";
        if (condition) {
            icon = "arrow-up";
            moneyIcon = "caret-up";
            iconColor = '#87d068';
        }
        return { icon: icon, moneyIcon: moneyIcon, color: iconColor }
    }

    openEdit = () => {
        // this.props.openEditModal(this.props.expense, { id: this.props.expense.id, previousDate: this.props.expense.date});
    }

    displayTitle = (iconData) => {
        let balanceIcon = this.getIconData(this.props.expense.balance > 0);
        return (
            <div>
                <Row>
                    <Col lg={9} xs={6} md={6} sm={6}>
                        <Ellipsis length={35} tooltip>{this.props.expense.description}</Ellipsis>
                    </Col>
                    <Col lg={2} xs={2} md={2} sm={2}>
                        {/* <Button onClick={this.openEdit} size="small" type="dashed" shape="circle" icon="edit" /> */}
                        <Icon type="edit" onClick={this.openEdit}></Icon>
                    </Col>
                    <Col lg={5} xs={7} md={7} sm={5} className="ExpenseCardTitle">
                        <Statistic
                            title="cantidad"
                            value={this.props.expense.value}
                            precision={2}
                            valueStyle={{ color: iconData.color, fontSize: "17px" }}
                            prefix={<Icon viewBox="0 0 1024 1024" type={iconData.moneyIcon}>L</Icon>}
                        />
                    </Col>
                    <Col className="ExpenseCardDescription" lg={5} xs={7} md={7} sm={5}>
                        <Statistic
                            title="balance"
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
        let iconData = this.getIconData(this.props.expense.isIncome);
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
    intl: PropTypes.object.isRequired,
    expense: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    openEditModal: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    goToPage: (location) => { dispatch(push(location)); },
});

export default connect(null, mapDispatchToProps)(ExpenseCard);

