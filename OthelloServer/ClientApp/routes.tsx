import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';


export const routes = 
    <Switch>
        <Route exact path="/" component={Home} />
        <Route component={RoutesWithNavbar} />
    </Switch>;

function RoutesWithNavbar() {
    return (<Layout>
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
    </Layout>)
}

