// add some ability to recreate board if client loses connection and reconnects
// also make sure getters don't give access to internals but rather a copy
export enum Colour {
    Black,
    White,
    Neither
}
export class Location {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public equals(loc: Location): boolean {
        return loc != null && loc.x == this.x && loc.y == this.y;
    }
}
export class BoardState {
    private turn: Colour;
    private board: Colour[][];
    constructor() {
        this.turn = Colour.Black;
        this.board = [];
        for (let x: number = 0; x < 8; x++) {
            this.board[x] = [];
            for (let y: number = 0; y < 8; y++) {
                this.board[x][y] = Colour.Neither;
            }
        }
        this.board[3][3] = Colour.White;
        this.board[4][4] = Colour.White;
        this.board[3][4] = Colour.Black;
        this.board[4][3] = Colour.Black;
    }
    private clone(): BoardState {
        let state: BoardState = new BoardState();
        for (let x: number = 0; x < 8; x++) {
            for (let y: number = 0; y < 8; y++) {
                state.board[x][y] = this.board[x][y];
            }
        }
        state.turn = this.turn;
        return state;
    }
    private static oppositePlayer(turnPlayer: Colour): Colour {
        if (turnPlayer == Colour.Black) {
            return Colour.White;
        }
        else if (turnPlayer == Colour.White) {
            return Colour.Black;
        }
        return Colour.Neither;
    }
    private static onBoard(square: Location): boolean {
        return square.x >= 0 && square.x < 8 && square.y >= 0 && square.y < 8;
    }
    private static colourOfPosition(state: BoardState, square: Location): Colour {
        return state.board[square.x][square.y];
    }
    private checkDirection(square: Location, nextMove: (current: Location) => Location): boolean {
        let opp: Colour = BoardState.oppositePlayer(this.turn);
        let next: Location = nextMove(square)
        if (!(BoardState.onBoard(next) && BoardState.colourOfPosition(this, next) == opp)) {
            return false;
        }
        for (next = nextMove(next); BoardState.onBoard(next); next = nextMove(next)) {
            let nextColour: Colour = BoardState.colourOfPosition(this, next)
            if (nextColour == this.turn) {
                return true;
            }
            else if (nextColour == Colour.Neither) {
                return false;
            }
        }
        return false;
    }
    private static setLocation(state: BoardState, square: Location, newColour: Colour): void {
        state.board[square.x][square.y] = newColour;
    }
    private flipDirection(square: Location, nextMove: (current: Location) => Location): void {
        if (!this.checkDirection(square, nextMove)) {
            return;
        }
        let opp: Colour = BoardState.oppositePlayer(this.turn);
        for (let next: Location = nextMove(square);
            BoardState.onBoard(next) && BoardState.colourOfPosition(this, next) == opp;
            next = nextMove(next)) {
            BoardState.setLocation(this, next, this.turn);
        }
    }
    private static nextRight(current: Location): Location {
        return new Location(current.x + 1, current.y);
    }
    private static nextLeft(current: Location): Location {
        return new Location(current.x - 1, current.y);
    }
    private static nextUp(current: Location): Location {
        return new Location(current.x, current.y - 1);
    }
    private static nextDown(current: Location): Location {
        return new Location(current.x, current.y + 1);
    }
    private static nextUpRight(current: Location): Location {
        return new Location(current.x + 1, current.y - 1);
    }
    private static nextUpLeft(current: Location): Location {
        return new Location(current.x - 1, current.y - 1);
    }
    private static nextDownRight(current: Location): Location {
        return new Location(current.x + 1, current.y + 1);
    }
    private static nextDownLeft(current: Location): Location {
        return new Location(current.x - 1, current.y + 1);
    }
    public legalMoves(): Location[] {
        let moves: Location[] = [];
        for (let x: number = 0; x < 8; x++) {
            for (let y: number = 0; y < 8; y++) {
                if (this.board[x][y] != Colour.Neither) {
                    continue;
                }
                let thisSquare: Location = new Location(x, y);
                let right = this.checkDirection(thisSquare, BoardState.nextRight);
                let left = this.checkDirection(thisSquare, BoardState.nextLeft);
                let up = this.checkDirection(thisSquare, BoardState.nextUp);
                let down = this.checkDirection(thisSquare, BoardState.nextDown);
                let upRight = this.checkDirection(thisSquare, BoardState.nextUpRight);
                let upLeft = this.checkDirection(thisSquare, BoardState.nextUpLeft);
                let downRight = this.checkDirection(thisSquare, BoardState.nextDownRight);
                let downLeft = this.checkDirection(thisSquare, BoardState.nextDownLeft);
                if (right || left || up || down || upRight || upLeft || downRight || downLeft) {
                    moves.push(thisSquare);
                }
            }
        }
        return moves;
    }
    public nextState(move: Location): BoardState {
        let state: BoardState = this.clone();
        state.flipDirection(move, BoardState.nextRight);
        state.flipDirection(move, BoardState.nextLeft);
        state.flipDirection(move, BoardState.nextUp);
        state.flipDirection(move, BoardState.nextDown);
        state.flipDirection(move, BoardState.nextUpRight);
        state.flipDirection(move, BoardState.nextUpLeft);
        state.flipDirection(move, BoardState.nextDownRight);
        state.flipDirection(move, BoardState.nextDownLeft);
        BoardState.setLocation(state, move, state.turn);
        state.turn = BoardState.oppositePlayer(state.turn);
        if (state.legalMoves().length == 0) {
            state.turn = BoardState.oppositePlayer(state.turn);
            if (state.legalMoves().length == 0) {
                state.turn == Colour.Neither;
            }
        }
        return state;
    }
    public getTurn(): Colour {
        return this.turn;
    }
    public getBoard(): Colour[][] {
        return this.board;
    }
}