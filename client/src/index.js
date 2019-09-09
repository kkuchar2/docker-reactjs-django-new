import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import exactIndexRoutes from "routes/exactRoutes.jsx";
import indexRoutes from "routes/indexRoutes.jsx";

import NotFound from "layouts/NotFound.jsx";
import {Provider} from "react-redux";

import store from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {exactIndexRoutes.map((p, k) => <Route exact path={p.path} component={p.component} key={k} />)}
                {indexRoutes.map((p, k) => <Route path={p.path} component={p.component} key={k} />)}
                <Route component={NotFound} key={0} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);