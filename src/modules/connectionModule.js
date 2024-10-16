import net from 'net';

import { parseMessageClass } from '../modules/atmModule.js';

let client = "";
let isConnected = false;

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
        isConnected = false;  
        console.log("ATM se ha desconectado: ", error.message);
    });  

    // Host response
    client.on('data', (data) => {
        let messageResponse = "";
        //Get message to reply to the host
        console.log(data.toString());
        messageResponse = parseMessageClass(data.toString('utf8'));
        sendMessage(messageResponse); //Sent response to host
    });
}

//Message request and response
// Write(): Returns "true" if the message was sent.
export function sendMessage(data) {
    let binaryData = "";
    binaryData = Buffer.from(getOutgoingMessageLength(data) + data, 'binary');
    let isMessageSent = client.write(binaryData);
    console.log("Respuesta: ", isMessageSent);
    return isMessageSent;
}

//Get message length (Header) - Request
function getOutgoingMessageLength(data) {
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
}

export {
    isConnected
} 