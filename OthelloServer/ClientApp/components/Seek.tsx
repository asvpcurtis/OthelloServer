import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { GameSeek, SeekParameters, SeekInfo } from '../services/GameSeek';
import { SeekListItem} from './SeekListItem';
import FormTextField from './FormTextField';
interface SeekState {
    min: number;
    max: number;
    seeks: SeekInfo[];
    seeking: boolean;
}

export class Seek extends React.Component<RouteComponentProps<{}>, {}> {
    connection: GameSeek;
    state: SeekState;
    constructor(props: RouteComponentProps<any> | undefined) {
        super(props);
        this.connection = new GameSeek((seeks: SeekInfo[]) => {
            console.log('fresh seeks...');
            console.log(seeks);
            this.setState({
                seeks: seeks
            });
        }, (gameId: string) => {
            console.log('game created ' + gameId);
        });
        this.state = {
            min: 0,
            max: 10000,
            seeks: [],
            seeking: false
        }
    }
    componentDidMount() {
        this.connection.open();
    }
    componentWillUnmount() {
        this.connection.close();
    }

    onClickCreateSeek = (e: any): void => {
        const param: SeekParameters = {
            min: this.state.min,
            max: this.state.max
        }
        console.log(param);
        this.setState({seeking: true})
        this.connection.createSeek(param);
    }
    onClickCancelSeek = (e: any): void => {
        console.log('canceling seek');
        this.setState({ seeking: false })
        this.connection.cancelSeek();
    }
    onSeekItemClick = (e: any, name: string): void => {
        console.log(name);
        this.connection.acceptSeek(name);
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        this.setState({
            [target.name]: target.value
        });
    };

    // add onClick to list item
    // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    public render() {

        let seekButton: JSX.Element;
        if (this.state.seeking) {
            seekButton = <button className="btn btn-primary" type="button" disabled>
                Seeking
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                <span className="sr-only">Loading...</span>
            </button>;
        }
        else {
            seekButton = <button className='btn btn-primary' onClick={this.onClickCreateSeek}>
                Create Seek
            </button>;
        }
        console.log(this.state.seeks);
        return (<div className="container">
            <div className="os-form">
                <h1>Othello Server Seek</h1>
                <hr />
                <FormTextField
                    inputName='min'
                    labelText='Min Opponent Rating'
                    inputId='min'
                    inputType='number'
                    onChange={this.handleChange}
                    inputText={this.state.min}
                    inputDisabled={this.state.seeking}
                />
                <FormTextField
                    inputName='max'
                    labelText='Max Opponent Rating'
                    inputId='max'
                    inputType='number'
                    onChange={this.handleChange}
                    inputText={this.state.max}
                    inputDisabled={this.state.seeking}
                />
                {seekButton}
                <button disabled={!this.state.seeking} className='btn btn-danger float-right' onClick={this.onClickCancelSeek}>Cancel Seek</button>
                <hr />
                <div className="card text-white bg-primary mb-3">
                    <div className="card-header">
                        Open Seeks
                    </div>
                    <div className="list-group list-group-flush">
                        {this.state.seeks.map(seek =>
                            <SeekListItem
                                key={seek.name}
                                seeker={seek.name}
                                rating={seek.rating}
                                onClick={(e: any) => { this.onSeekItemClick(e, seek.name) }}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>);
    }
}
