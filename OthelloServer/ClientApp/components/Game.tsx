import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BoardState, Colour, Location } from '../services/BoardState';
import { Board } from './Board';

interface GameState {
    blackPlayer: string;
    whitePlayer: string;
    board: BoardState;
}
export class Game extends React.Component<RouteComponentProps<{}>, GameState> {
    
    state: GameState;

    constructor(props: RouteComponentProps<any> | undefined) {
        super(props);
        this.state = {
            blackPlayer: 'name1',
            whitePlayer: 'name2',
            board: new BoardState()
        }
    }

    squareOnClick = (loc: Location): void => {
        let legalMoves: Location[] = this.state.board.legalMoves();
        console.log(legalMoves);
        console.log(loc);
        if (legalMoves.some((move: Location): boolean => { return loc.equals(move) })) {
            this.setState({
                board: this.state.board.nextState(loc)
            })
        }
    }
    public render() {
        return <div className={'os-form'}>
            <h1>Othello Server Game</h1>
            <hr />
            <p>Black is: {this.state.blackPlayer}</p>
            <p>White is: {this.state.whitePlayer}</p>
            <Board board={this.state.board} squareOnClick={this.squareOnClick} />
        </div>;
    }
}
