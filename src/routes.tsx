import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing     from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Error404    from './pages/Error404';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact       component={Landing} />
                <Route path="/study"        component={TeacherList} />
                <Route path="/give-classes" component={TeacherForm} />
                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;