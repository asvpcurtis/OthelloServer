import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register'
import { FetchData } from './examples/FetchData';
import { Counter } from './examples/Counter';
import { Private } from './components/Private';
import { Seek } from './components/Seek';

export const routes = 
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Private>
            <Route path='/counter' component={Counter} />
            <Route exact path='/' component={Seek} />
        </Private>
        <Route component={RoutesWithNavbar} />
    </Switch>;

function RoutesWithNavbar() {
    return (<Layout>
        
        <Route path='/fetchdata' component={FetchData} />
    </Layout>)
}

