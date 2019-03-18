import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { RegisterModel } from '../models/RegisterModel';
import FormTextField from './FormTextField';
import { Link } from 'react-router-dom';

export class Register extends React.Component<RouteComponentProps<{}>, {}> {

    state: RegisterModel = {
        username: "test",
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
                <h1>Othello Server Register</h1>
                <hr />
                <form action="/api/accounts" method="POST">
                    <FormTextField
                        inputName='username'
                        labelText='Username'
                        inputId='username'
                        inputType='text'
                        onChange={this.handleChange}
                        inputText=''
                        error={undefined}
                    />
                    <FormTextField
                        inputName='email'
                        labelText='Email'
                        inputId='email'
                        inputType='text'
                        onChange={this.handleChange}
                        inputText=''
                        error={undefined}
                    />
                    <FormTextField
                        inputName='password'
                        labelText='Password'
                        inputId='password'
                        inputType='password'
                        onChange={this.handleChange}
                        inputText=''
                        error={undefined}
                    />
                    <div className="form-actions single">
                        <button className="btn btn-primary" type="submit">Register</button>
                    </div>
                </form>
            </div>
            <div className="os-form">
                Have an Account? <Link to="/">Login</Link>
            </div>
        </div>;
    }
}