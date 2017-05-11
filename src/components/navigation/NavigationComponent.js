import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


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
                    width={190}
                    trigger={null}
                >
                    <div className="logo" onClick={this.handleLogo}>{!collapsed? 'Survey Dashboard': <Icon type="home" />}</div>
                    <Menu
                        mode={this.state.mode}
                        style={{ height: '100%' }}
                        onClick={this.handleMenu}
                        selectedKeys={[selectedKey]}
                    >
                        <Menu.Item key="questions">
                          <span>
                            <Icon type="question-circle-o" />
                            <span className="nav-text">Questions</span>
                          </span>
                        </Menu.Item>
                        <Menu.Item key="logout">
                          <span>
                            <Icon type="logout" />
                            <span className="nav-text">Logout</span>
                          </span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#ECECEC', padding: 0 }}>
                    </Header>
                    <div className="page-wrapper">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </div>
                    <Footer style={{ textAlign: 'center' }}>
                        Survey Dashboard
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default NavigationComponent;
