import { Reducer, combineReducers, ReducersMapObject } from "redux";
import { routerReducer } from "react-router-redux";
//import * as Home from './Home';
import { LoginModel } from '../models/LoginModel'

export interface ApplicationState {
    //todos: LoginModel;
    //router?: any;
}

const reducers: ReducersMapObject = {
//    home: Home.reducer
};

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    ...reducers,
    routing: routerReducer
});