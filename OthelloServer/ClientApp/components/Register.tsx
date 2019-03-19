import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { RegisterModel, RegisterFailure, register } from '../requests/Registration';
import FormTextField from './FormTextField';
import { Link, Redirect } from 'react-router-dom';

interface RegisterState {
    username: string;
    email: string;
    password: string;
    error: RegisterFailure;
    redirect: boolean;
}

export class Register extends React.Component<RouteComponentProps<{}>, {}> {

    state: RegisterState = {
        username: "",
        email: "",
        password: "",
        error: {},
        redirect: false
    };

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
        console.log(payload);
        
        register(payload, () => {
            this.setState({ redirect: true })
            console.log('account created');
        }, (err: RegisterFailure) => {
            this.setState({ error: err })
            console.log(this.state);
        });
        
    }


    public render() {
        if (this.state.redirect) {
            this.props.history.push('/register');
            return <Redirect to='/' />
        }
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