import * as signalR from '@aspnet/signalr';
import { getJwt } from './Auth';

export interface SeekParameters {
    min: number;
    max: number;
}

export interface SeekInfo {
    name: string;
    rating: number;
}

export class GameSeek {
    private readonly connection: signalR.HubConnection;

    constructor(updateHook: (seeks: SeekInfo[]) => void, gameHook: (gameId: string) => void) {
        const jwt: string = getJwt() || '{}';
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("/socket/seek", { accessTokenFactory: () => jwt })
            .build();
        this.connection.on("UpdateSeeks", updateHook);
        this.connection.on("GameMade", gameHook);
    }
    public open() {
        this.connection.start();
    }
    public createSeek(parameters: SeekParameters) {
        this.connection.invoke('CreateSeek', parameters)
    }
    public cancelSeek() {
        this.connection.invoke('CancelSeek');
    }
    public acceptSeek(seeker: string) {
        this.connection.invoke('AcceptSeek', seeker)
    }
    public close() {
        this.connection.stop();
    }
}
