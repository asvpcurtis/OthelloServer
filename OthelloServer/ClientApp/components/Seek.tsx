import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { cancelSeek, acceptSeek, createSeek, SeekParameters } from '../services/GameSeek';
interface SeekState {

}

export class Seek extends React.Component<RouteComponentProps<{}>, {}> {

    state: SeekState;

    constructor(props: RouteComponentProps<any> | undefined) {
        super(props);
        this.state = {
        }
    }

    onclick(e: any) {
        const param: SeekParameters = {
            Min: 0,
            Max: 10000
        }
        createSeek(param);
    }

    public render() {
        return <div className="container">
            <div className="os-form">
                <button onClick={this.onclick}></button>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Cras justo odio
                            <span className="badge badge-primary badge-pill">1614</span>
                        </li>
                        <li className="list-group-item">
                            Hiko1
                            <span className="badge badge-primary badge-pill">2087</span>
                        </li>
                        <li className="list-group-item">
                            Evyb
                            <span className="badge badge-primary badge-pill">817</span>
                        </li>
                        <li className="list-group-item">
                            MiraBellier
                            <span className="badge badge-primary badge-pill">1614</span>
                        </li>
                        <li className="list-group-item">
                            Dapibus ac facilisis in
                            <span className="badge badge-primary badge-pill">2087</span>
                        </li>
                        <li className="list-group-item">
                            Vestibulum at eros
                            <span className="badge badge-primary badge-pill">817</span>
                        </li>
                        <li className="list-group-item">
                            Vestibulum at eros
                            <span className="badge badge-primary badge-pill">817</span>
                        </li>
                        <li className="list-group-item">
                            Cras justo odio
                            <span className="badge badge-primary badge-pill">1614</span>
                        </li>
                        <li className="list-group-item">
                            Dapibus ac facilisis in
                            <span className="badge badge-primary badge-pill">2087</span>
                        </li>
                        <li className="list-group-item">
                            Vestibulum at eros
                            <span className="badge badge-primary badge-pill">817</span>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>;
    }
}
