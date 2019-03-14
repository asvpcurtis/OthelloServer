import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { LoginModel } from '../models/LoginModel';
import FormTextField from './FormTextField';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

    state: LoginModel = {
        email: "test",
        password: "test"
    };

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        this.setState({
            [target.name]: target.value
        });
    };

    isValid() {

    }
    onSubmit = (e: any) => {
        e.preventDefault();
        /*
        if (this.isValid()) {

        }
        */
    }


    public render() {
        return <div className="container">
            <div className="os-form">
                <h1>Othello Server Login</h1>
                <hr/>
                <form action="/api/accounts" method="POST">
                    <FormTextField
                        inputName='email'
                        labelText='Email'
                        inputId='email'
                        onChange={this.handleChange}
                        inputText=''
                        error=''
                    />
                    <FormTextField
                        inputName='password'
                        labelText='Password'
                        inputId='password'
                        onChange={this.handleChange}
                        inputText=''
                        error=''
                    />
                    <div className="form-actions single">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
            <div className="os-form">
                New to Othello Server? <a href="www.google.com">Register</a>
            </div>
        </div>;
    }


}
