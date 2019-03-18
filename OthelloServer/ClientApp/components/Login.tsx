import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoginSuccess, LoginFailure, LoginModel, login} from '../requests/Auth';
import FormTextField from './FormTextField';
import { Link, Redirect } from 'react-router-dom';

interface LoginState {
    email: string,
    password: string,
    error: LoginFailure
    redirect: boolean
}
export class Login extends React.Component<RouteComponentProps<{}>, {}> {

    state: LoginState;
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {},
            redirect: false
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
        const payload: LoginModel = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(payload)
        login(payload, (res: LoginSuccess) => {
            localStorage.setItem('OthelloServerJwt', res.token)
            this.setState({redirect: true})
        }, (err: LoginFailure) => {
            this.setState({ error: err })
            console.log(this.state);
        });
    }
    
    public render() {
        if (this.state.redirect) {
            this.props.history.push('/');
            return <Redirect to="/counter" />
        }
        return <div className="container">
            <div className="os-form">
                <h1>Othello Server Login</h1>
                <hr />
                {this.state.error.login_failure && <div className="alert alert-danger">{this.state.error.login_failure[0]}</div>}
                <form onSubmit={this.onSubmit}>
                    <FormTextField
                        inputName='email'
                        labelText='Email'
                        inputId='email'
                        onChange={this.handleChange}
                        inputType='text'
                        inputText=''
                        error={this.state.error.Email}
                    />
                    <FormTextField
                        inputName='password'
                        labelText='Password'
                        inputId='password'
                        inputType='password'
                        onChange={this.handleChange}
                        inputText=''
                        error={this.state.error.Password}
                    />
                    <div className="form-actions single">
                        <button className="btn btn-primary" type="submit">Sign In</button>
                    </div>
                </form>
            </div>
            <div className="os-form">
                New to Othello Server? <Link to="/Register">Register</Link>
            </div>
        </div>;
    }


}
