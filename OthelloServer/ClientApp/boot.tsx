import './css/site.css';
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory, History } from 'history';
import configureStore from './configureStore';
import { ApplicationState } from './reducers/RootReducer';
import * as RoutesModule from './routes';
import { Store } from 'redux';

let routes = RoutesModule.routes;

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl: string | null = document.getElementsByTagName('base')[0].getAttribute('href')!;
    const history: History = createBrowserHistory({ basename: baseUrl });
    const rootElement: HTMLElement | null = document.getElementById('react-app');
    // Get the application-wide store instance, prepopulating with state from the server where available.
    const initialState: ApplicationState = {
        loginState: null
    };

    const store: Store<ApplicationState> = configureStore(history, initialState);
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter children={routes} />
            </Provider>
        </AppContainer>,
        rootElement
    );
    
}

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
