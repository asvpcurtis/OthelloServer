import * as signalR from '@aspnet/signalr';
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/socket/seek")
    .build();

connection.on("send", data => {
    console.log(data);
});

connection.start()
    .then(() => connection.invoke("send", "Hello"));

export default connection;