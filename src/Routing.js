import React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Login from "./views/Login/Login";
import Cars from "./views/Cars/Cars";
import NotFound from "./views/NotFound/NotFound";

function Routing(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/cars" component={Cars}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

Routing.propTypes = {};
Routing.defaultProps = {};

export default Routing;
