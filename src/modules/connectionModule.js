import net from 'net';

import { parseMessage } from '../modules/atmModule.js';

let client = "";
export let isConnected = false;

//Set connection with host
export function connection(host, port) {

    if (!isConnected) {
        //Create connection
        client = net.createConnection(port, host, () => {
            console.log('ATM CONECTADO');
            isConnected = true;  
        }); 
    }

     //Connection error
     client.on('error', (error) => {
        console.log("ATM se ha desconectado: ", error.message);
    });  

    // IBM i response
    client.on('data', (data) => {
        let messageResponse = "";
        //Get message to reply to the IBM i
        console.log(data.toString());
        messageResponse = parseMessage(data.toString());
        //sendMessage(messageResponse); //Sent response to IBM i
    });
}

//Message request and response
// Write(): Returns "true" if the message was sent.
export function sendMessage(data) {
    let binary_data = "";
    binary_data = Buffer.from(getOutgoingMessageLength(data) + data, 'binary');
    let isMessageSent = client.write(binary_data);
    console.log("Respuesta: ", isMessageSent);
    return isMessageSent;
}

//Get message length (Header) - REQUEST
function getOutgoingMessageLength(data) {
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
}

 