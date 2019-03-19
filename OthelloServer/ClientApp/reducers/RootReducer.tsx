import { Reducer, combineReducers } from "redux";
import { LoginModel } from '../services/auth'

export interface ApplicationState {
    loginState: LoginModel | null;
    //router?: any;
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    //auth: Auth.reducer
});