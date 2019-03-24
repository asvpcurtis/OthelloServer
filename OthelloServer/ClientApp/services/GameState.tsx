// add some ability to recreate board if client loses connection and reconnects

export enum Colour {
    Black,
    White,
    Neither
}
export interface Location {
    x: number;
    y: number;
}
export class GameState {
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

    private clone(): GameState {
        let state: GameState = new GameState();
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
    private static colourOfPosition(state: GameState, square: Location): Colour {
        return state.board[square.x][square.y];
    }
    private checkDirection(square: Location, nextMove: (current: Location) => Location): boolean {
        let opp: Colour = GameState.oppositePlayer(this.turn);
        let next: Location = nextMove(square)
        if (!(GameState.onBoard(next) && GameState.colourOfPosition(this, next) == opp)) {
            return false;
        }
        for (next = nextMove(next); GameState.onBoard(next); next = nextMove(next)) {
            let nextColour: Colour = GameState.colourOfPosition(this, next)
            if (nextColour == this.turn) {
                return true;
            }
            else if (nextColour == Colour.Neither) {
                return false;
            }
        }
        return false;
    }

    private static setLocation(state: GameState, square: Location, newColour: Colour): void {
        state.board[square.x][square.y] = newColour;
    }

    private flipDirection(square: Location, nextMove: (current: Location) => Location): void {
        if (!this.checkDirection(square, nextMove)) {
            return;
        }
        let opp: Colour = GameState.oppositePlayer(this.turn);
        for (let next: Location = nextMove(square);
            GameState.onBoard(next) && GameState.colourOfPosition(this, next) == opp;
            next = nextMove(next)) {
            GameState.setLocation(this, next, this.turn);
        }
    }
    private static nextRight(current: Location) {
        return { x: current.x + 1, y: current.y };
    }
    private static nextLeft(current: Location) {
        return { x: current.x - 1, y: current.y };
    }
    private static nextUp(current: Location) {
        return { x: current.x, y: current.y - 1 };
    }
    private static nextDown(current: Location) {
        return { x: current.x, y: current.y + 1 };
    }
    private static nextUpRight(current: Location) {
        return { x: current.x + 1, y: current.y - 1 };
    }
    private static nextUpLeft(current: Location) {
        return { x: current.x - 1, y: current.y - 1 };
    }
    private static nextDownRight(current: Location) {
        return { x: current.x + 1, y: current.y + 1 };
    }
    private static nextDownLeft(current: Location) {
        return { x: current.x - 1, y: current.y + 1 };
    }
    public legalMoves(): Location[] {
        let moves: Location[] = [];
        for (let x: number = 0; x < 8; x++) {
            for (let y: number = 0; y < 8; y++) {
                if (this.board[x][y] == Colour.Neither) {
                    continue;
                }
                let thisSquare: Location = { x: x, y: y };
                let right = this.checkDirection(thisSquare, GameState.nextRight);
                let left = this.checkDirection(thisSquare, GameState.nextLeft);
                let up = this.checkDirection(thisSquare, GameState.nextUp);
                let down = this.checkDirection(thisSquare, GameState.nextDown);
                let upRight = this.checkDirection(thisSquare, GameState.nextUpRight);
                let upLeft = this.checkDirection(thisSquare, GameState.nextUpLeft);
                let downRight = this.checkDirection(thisSquare, GameState.nextDownRight);
                let downLeft = this.checkDirection(thisSquare, GameState.nextDownLeft);
                if (right || left || up || down || upRight || upLeft || downRight || downLeft) {
                    moves.push(thisSquare);
                }
            }
        }
        return moves;
    }

    public nextState(move: Location): GameState {
        let state: GameState = this.clone();
        state.flipDirection(move, GameState.nextRight);
        state.flipDirection(move, GameState.nextLeft);
        state.flipDirection(move, GameState.nextUp);
        state.flipDirection(move, GameState.nextDown);
        state.flipDirection(move, GameState.nextUpRight);
        state.flipDirection(move, GameState.nextUpLeft);
        state.flipDirection(move, GameState.nextDownRight);
        state.flipDirection(move, GameState.nextDownLeft);
        state.turn = GameState.oppositePlayer(state.turn);
        if (state.legalMoves.length == 0) {
            state.turn = GameState.oppositePlayer(state.turn);
            if (state.legalMoves.length == 0) {
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