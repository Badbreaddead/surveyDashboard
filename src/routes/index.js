import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NotFoundComponent from '../components/common/NotFoundComponent';
import WrappedLogin from '../components/login/Login';
import Questions from '../components/questions/Questions';

export const urls = {
    index: {
        path: '/'
    },
    login: {
	    path: '/login'
    },
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent}>
            <IndexRoute component={Questions} />
        </Route>
        <Route path={urls.login.path} component={WrappedLogin} />
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
