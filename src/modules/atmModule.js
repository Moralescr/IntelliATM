import {sendMessage} from '../modules/connectionModule.js';
import {pool} from '../database/dbConnection.js';

//parse parse the message from host
export function parseMessage(data) {
    let messageParsed = data.split('\x1c');
    switch(messageParsed[0]) {
        case '1':
            parseTerminalCommand(messageParsed);
            break;
        case '3':
            //Configuration or Download
            break;
        case '4':
            //Transaction reply
            break;
        case '8':
            //EMV configuration
            break;
        default:
            console.log("Message class not found");
    }
    //return messageResponse;
}

//Parse host command message class 1
export function parseTerminalCommand(messageParsed){
    let parsed = {};
    parsed.message_class = 'Terminal Command';
    parsed.LUNO = messageParsed[1];
    parsed.message_sequence_number = messageParsed[2];
    console.log(parsed);
}

//Checks first two bytes of incoming message to get the length
export function getIncomingMessageLength(message){
    let len = parseInt(message.charCodeAt(0), 10) * 256 + parseInt(message.charCodeAt(1), 10);
    if(!isNaN(len))
      return len;
    else
      return 0;
}