import { applyMiddleware, compose, createStore, Middleware, Reducer, Store, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { ApplicationState } from './reducers/RootReducer';
import * as ReducerModule from './reducers/RootReducer';
// react redux typescript
// https://www.youtube.com/watch?v=5ZByttWSJM4
// https://github.com/rokoroku/react-redux-typescript-boilerplate/tree/master/src/app
//hot module replacement? + other ideas like how to typescriptify this
// https://github.com/aspnet/AspNetCore/issues/5195

let rootReducer: Reducer<ApplicationState> = ReducerModule.rootReducer;

export default function configureStore(history: History, initialState: ApplicationState): Store<ApplicationState> {
    const middleware: Middleware[] = [
        thunk
    ];
    const enhancers: StoreEnhancer<ApplicationState>[] = [];

    const store: Store<ApplicationState> = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    
    if (module.hot) {
        module.hot.accept('./reducers/RootReducer', () => {
            const nextRootReducer: Reducer<ApplicationState> =
                require<typeof ReducerModule>('./reducers/RootReducer').rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    }
    
    return store
}