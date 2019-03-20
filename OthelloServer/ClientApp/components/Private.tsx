import * as React from 'react';
import { isLoggedIn } from '../services/Auth';
import { Redirect } from 'react-router';

export interface PrivateProps {
    children?: React.ReactNode;
}

export class Private extends React.Component<PrivateProps, {}> {
    public render() {
        if (isLoggedIn()) {
            return <div>{this.props.children}</div>;
        }
        return <Redirect to='/login' />;
    }
}