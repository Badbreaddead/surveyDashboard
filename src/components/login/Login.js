import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from './LoginForm';

import UserActions from '../../actions/user';

class Login extends Component {

	login = (user) => {
		const { userActions } = this.props;

		userActions.login(user);
	};

    render() {

        return (
	        <div className="login">
		        <h1 className="login-title">Surveys</h1>
		        <LoginForm login={this.login}/>
	        </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(new UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);