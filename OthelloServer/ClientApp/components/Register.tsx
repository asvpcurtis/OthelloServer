import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { RegisterModel, RegisterFailure, register } from '../services/Accounts';
import FormTextField from './FormTextField';
import { Link, Redirect } from 'react-router-dom';

interface RegisterState {
    username: string;
    email: string;
    password: string;
    error: RegisterFailure;
}

export class Register extends React.Component<RouteComponentProps<{}>, {}> {

    state: RegisterState;

    constructor(props: RouteComponentProps<any> | undefined) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: {}
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        this.setState({
            [target.name]: target.value
        });
    };
    
    onSubmit = (e: any) => {
        e.preventDefault();
        const payload: RegisterModel = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
        register(payload, () => {
            this.props.history.push('/login');
        }, (err: RegisterFailure) => {
            this.setState({ error: err })
        });
        
    }


    public render() {
        const fail: RegisterFailure = this.state.error;
        return <div className="container">
            <div className="os-form">
                <h1>Othello Server Register</h1>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <FormTextField
                        inputName='username'
                        labelText='Username'
                        inputId='username'
                        inputType='text'
                        onChange={this.handleChange}
                        inputText=''
                        error={fail.UserName ? fail.UserName : fail.DuplicateUserName}
                    />
                    <FormTextField
                        inputName='email'
                        labelText='Email'
                        inputId='email'
                        inputType='text'
                        onChange={this.handleChange}
                        inputText=''
                        error={fail.Email ? fail.Email : fail.DuplicateEmail}
                    />
                    <FormTextField
                        inputName='password'
                        labelText='Password'
                        inputId='password'
                        inputType='password'
                        onChange={this.handleChange}
                        inputText=''
                        error={fail.Password ? fail.Password : fail.PasswordTooShort}
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