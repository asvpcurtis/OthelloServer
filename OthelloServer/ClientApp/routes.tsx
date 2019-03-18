import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register'
import { FetchData } from './examples/FetchData';
import { Counter } from './examples/Counter';


export const routes = 
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/counter' component={Counter} />
        <Route component={RoutesWithNavbar} />
    </Switch>;

function RoutesWithNavbar() {
    return (<Layout>
        
        <Route path='/fetchdata' component={FetchData} />
    </Layout>)
}

