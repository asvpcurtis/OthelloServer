import * as signalR from '@aspnet/signalr';
import { getJwt } from './Auth';
export interface SeekParameters {
    Min: number;
    Max: number;
}

export interface Seeker {
    Name: string;
    Rating: number;
}


const jwt: string = getJwt() || '{}';

let connection = new signalR.HubConnectionBuilder()
    .withUrl("/socket/seek", { accessTokenFactory: () => jwt })
    .build();

connection.on("send", data => {
    console.log('received from server')
    console.log(data);
});

connection.start()
    //.then(() => connection.invoke("send", "Hello"));

export function createSeek(parameters: SeekParameters) {
    console.log('sending to server')
    console.log(parameters)
    connection.invoke("CreateSeek", parameters)
    //connection.invoke("send", "test")
}

export function cancelSeek() {
    //connection.invoke("send", "cancel my seek");
}

export function acceptSeek() {
    //connection.invoke("send", "accept this seek");

}

