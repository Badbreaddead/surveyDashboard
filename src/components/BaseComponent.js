import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationComponent from './navigation/NavigationComponent';

class BaseComponent extends Component {

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

// const mapStateToProps = (state) => ({showUploadPanel: state.showUploadPanel});
// const mapDispatchToProps = (dispatch) => (bindActionCreators(new AuthActions,dispatch));

export default BaseComponent;