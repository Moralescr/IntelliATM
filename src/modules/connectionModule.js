import net from 'net';

import { parseMessageClass } from '../modules/atmModule.js';

let client;
let isConnected = false;

//Set connection with host
export function connect(host, port) {
    return new Promise((resolve, reject) => {
        if (!isConnected) {
            //Create connection
            client = net.createConnection(port, host, () => {
                console.log('ATM CONNECTED');
                isConnected = true;
                resolve(isConnected);
            });           
            /*
            // Host response
            client.on('data', (data) => {
                let messageResponse = "";
                console.log(data.toString());
                //Get and parse message to reply to the host
                messageResponse = parseMessageClass(data.toString('utf8'));
                sendMessage(messageResponse); //Sent response to host
            }); 
            */

            //Connection error
            client.on('error', (error) => {
                isConnected = false;
                console.log("Error de conexión: ", error.message);
                reject(err);
            });

            //Connection end  
            client.on('end', () => {
                isConnected = false;
                console.log('Desconectado del servidor');
            });

        } else {
            resolve(isConnected);
        }
    });
}

//Message request and response
// Write(): Returns "true" if the message was sent.
export function sendMessage(data) {
    let binaryData = "";
    binaryData = Buffer.from(getOutgoingMessageLength(data) + data, 'binary');
    //console.log("Mensaje enviado: ", binaryData.toString('utf8'));
    client.write(binaryData);
}

export function hostResponse() {
    return new Promise((resolve, reject) => {
        // Host response
        client.on('data', (data) => {
            let messageResponse = "";
            console.log(data.toString());
            //Get and parse message to reply to the host
            messageResponse = parseMessageClass(data.toString());
            resolve(messageResponse);
        });
    });
}

//Get message length (Header) - Request
function getOutgoingMessageLength(data) {
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
}

