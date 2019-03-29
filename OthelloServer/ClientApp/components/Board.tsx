//https://gitlab.com/the-gigi/connect4/blob/master/client/src/components/Board.js

import * as React from 'react';
import { BoardState, Location, Colour } from '../services/BoardState';

interface BoardProps {
    board: BoardState;
    lastMove?: Location;
    squareOnClick: (loc: Location) => void;
}
const squareWidth: number = 50;
export const Board = (props: BoardProps): JSX.Element => {
    let squares: JSX.Element[] = [];
    let pieces: Colour[][] = props.board.getBoard();
    let legalMoves: Location[] = props.board.legalMoves();
    for (let x: number = 0; x < 8; x++) {
        for (let y: number = 0; y < 8; y++) {
            let thisSquare: Location = new Location(x, y);
            let IsLegalMove: boolean = legalMoves.some((loc: Location) => {
                return thisSquare.equals(loc)
            });
            let legalIndicator: JSX.Element | null = null;
            if (IsLegalMove) {
                legalIndicator = createLegalIndicator(thisSquare);
            }
            let square: JSX.Element = <g
                onClick={(e) => {
                    props.squareOnClick(new Location(x, y))
                }}
            >
                {createBackground(thisSquare)}
                {createPiece(pieces[x][y], thisSquare)}
                {legalIndicator}
            </g>
            squares.push(square);
        }
    }
    return <svg width={squareWidth * 8} height={squareWidth * 8}>
        {squares}
    </svg>;

}

const createBackground = (loc: Location): JSX.Element => {
    return <rect
        x={loc.x * squareWidth}
        y={loc.y * squareWidth}
        fill={'green'}
        stroke={'black'}
        width={squareWidth}
        height={squareWidth}
    />
}
const createLegalIndicator = (loc: Location): JSX.Element => {
    return <circle
        cx={(loc.x * squareWidth) + (squareWidth / 2)}
        cy={(loc.y * squareWidth) + (squareWidth / 2)}
        stroke={'black'}
        fill={'transparent'}
        r={squareWidth / 3}
    />
}

const createPiece = (colour: Colour, loc: Location): JSX.Element | null => {
    if (colour == Colour.Neither) {
        return null;
    }
    let fillColour: string;
    if (colour == Colour.White) {
        fillColour = 'white';
    }
    else {
        fillColour = 'black';
    }
    return <circle
        cx={(loc.x * squareWidth) + (squareWidth / 2)}
        cy={(loc.y * squareWidth) + (squareWidth / 2)}
        stroke={'black'}
        fill={fillColour}
        r={squareWidth / 2.5}
    />
} 