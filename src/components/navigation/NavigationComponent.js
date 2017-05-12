import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;


class NavigationComponent extends React.Component {
    constructor(props) {
        super(props);
        const pathname = this.props.children.props.location.pathname;
        const selectedKey = pathname.split('/')[1];
        this.state = {
            mode: 'inline',
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
        switch (e.key) {
            case 'questions': {
                browserHistory.push('/');
                break;
            }
            case 'logout': {
                browserHistory.push('/login');
                break;
            }
        }
    };

    handleLogo = () => {
        this.setState({selectedKey: null});
        browserHistory.push('/');
    };

    render() {
        const {collapsed, selectedKey} = this.state;
        return (
            <Layout>
                <Sider
                    width={150}
                    trigger={null}
                >
                    <div className="logo" onClick={this.handleLogo}>{!collapsed? 'Survey Dashboard': <Icon type="home" />}</div>
                    <Menu
                        mode={this.state.mode}
                        onClick={this.handleMenu}
                        selectedKeys={[selectedKey]}
                        className="menu"
                    >
                        <Menu.Item className={selectedKey === '' ? 'menu-item menu-item-active' : 'menu-item'} key="questions">
                          <span>
                            <Icon type="question-circle-o" />
                            <span>Questions</span>
                          </span>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="logout">
                          <span>
                            <Icon type="logout" />
                            <span>Logout</span>
                          </span>
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

export default NavigationComponent;
