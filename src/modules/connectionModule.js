import { STATUS_CODES } from 'http';
import net from 'net';

let client = "";
let isConnected = false;

//Set connection with host
export function connection(host, port) {
    
    //Create connection
    client = net.createConnection(port, host);
    if (isConnected == false) {
        client.on('connect', (req, res)=> {
            console.log('ATM conectado'); 
        });

        //Connection error
        client.on('error', (e) => {
            console.log("ATM se ha desconectado", e.message);
        });  
    
        // IBM i response
        client.on('data', (data) => {
            console.log("servidor dice:", data);
            sendMessage("Datos recibidos");
        });

        return isConnected;
    }
}

//Get message length (Header)
export function getOutgoingMessageLength(data) {
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
}

//Messge request and response
export function sendMessage(data) {
    let binary_data = "";
    binary_data = Buffer(getOutgoingMessageLength(data) + data, 'binary');
    client.write(binary_data);
}
