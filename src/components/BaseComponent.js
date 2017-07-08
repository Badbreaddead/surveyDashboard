import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import UserActions from '../actions/user';

import NavigationComponent from './navigation/NavigationComponent';

class BaseComponent extends Component {

	componentWillMount() {
		const { userActions, user } = this.props;

		if (!user) {
			userActions.getUser();
		}
	}

    render() {
        const {children} = this.props;
        return (
            <NavigationComponent children={children} />
        );
    }
}

BaseComponent.PropTypes = {
    children: PropTypes.element.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user.questions,
});

const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(new UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);