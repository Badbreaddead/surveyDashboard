import React from 'react';
import { Route, IndexRoute } from 'react-router';

import BaseComponent from '../components/BaseComponent';
import NotFoundComponent from '../components/common/NotFoundComponent';
import MainPage from '../components/main/MainPage';

export const urls = {
    index: {
        path: '/'
    }
};

export default (
    <Route>
        <Route path={urls.index.path} component={BaseComponent}>
            <IndexRoute component={MainPage} />
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Route>
);
