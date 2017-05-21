import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Menu, Icon } from 'antd';

import UserActions from '../../actions/user';

const { Sider } = Layout;


class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);
        const pathname = this.props.children.props.location.pathname;
        const selectedKey = pathname.split('/')[1];
        this.state = {
            mode: 'inline',
	        collapsed: true,
            selectedKey
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children.props.location.pathname !== this.props.children.props.location.pathname) {
            const pathname = nextProps.children.props.location.pathname;
            const selectedKey = pathname.split('/')[1];
            this.setState({selectedKey});
        }
    };

    handleMenu = (e) => {
	    const { userActions } = this.props;

	    switch (e.key) {
            case 'questions': {
                browserHistory.push('/');
                break;
            }
            case 'logout': {
	            userActions.logout();
                break;
            }
        }
    };

    handleLogo = () => {
        this.setState({selectedKey: null});
        browserHistory.push('/');
    };

	onCollapse = (collapsed) => {
		this.setState({
			collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		});
	};

    render() {
        const {collapsed, selectedKey} = this.state;
        return (
            <Layout>
                <Sider
                    width={120}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" onClick={this.handleLogo}>{!collapsed? 'Surveys': <Icon type="home" />}</div>
                    <Menu
                        mode={this.state.mode}
                        onClick={this.handleMenu}
                        selectedKeys={[selectedKey]}
                        className="menu"
                    >
                        <Menu.Item className={selectedKey === '' ? 'menu-item menu-item-active' : 'menu-item'} key="questions">
							<span>
								<Icon type="question-circle-o" />
								{!collapsed ?
									<span>Questions</span>
								: null}
							</span>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="logout">
							<span>
								<Icon type="logout" />
								{!collapsed ?
									<span>Logout</span>
								: null}
							</span>
                        </Menu.Item>
	                    <Menu.Item className="menu-item">
							<a href="https://web.telegram.org/#/im?p=@CoinSurveydevbot" target="_blanc">
								<Icon type="shake" />
								{!collapsed ?
									<span>Telegram bot</span>
									: null}
							</a>
	                    </Menu.Item>
	                    <Menu.Item className="menu-item">
		                    <a href="https://docs.google.com/spreadsheets/d/1TAidjIed5goBfdtIk81L955tSx-zyChioCHT2VzkdBg/edit#gid=0" target="_blanc">
			                    <Icon type="solution" />
			                    {!collapsed ?
				                    <span>Spreadsheet</span>
				                    : null}
		                    </a>
	                    </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <div className="page-wrapper">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </div>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(new UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationComponent);