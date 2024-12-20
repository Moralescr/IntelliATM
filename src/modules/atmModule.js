import { sendMessage } from '../modules/connectionModule.js';
import { pool } from '../database/dbConnection.js';

//Parse the message from host
export function parseMessageClass(data) {
    let messageResponse = "";
    let messageParsed = data.substring(2).split('\x1c');  //Create array with message fields
    let messageClass = messageParsed[0].trim();           //Get message class

    let messageObject = {
        messageClass: messageClass
    }

    switch (messageClass) {
        case '1': //Terminal commands
            messageResponse = parseTerminalCommand(messageParsed);
            break;
        case '3': //Data commands (Download, Key change)
            messageResponse = parseDataCommand(messageParsed);
            break;
        case '4': //Message transaction reply
            messageResponse = parseTransactionReply(messageParsed);
            break;
        case '8': //EMV configuration
            break;
        default:
            console.log("Message class not found");
            break;
    }
    return messageResponse;
}

/*
    NCR terminal command example: **1 *001*000*1 
    '**': Header protocol-dependent
    '1 ': Message class (Terminal command) and response flag (Not used)
     '*': Field separator
   '001': Logical unit number(LUNO)
     '*': Field separator
   '000': Message sequence number
     '*': Field separator
     '1': Command code(Go in‐service)
*/
export function parseTerminalCommand(messageParsed) {
    let commandCode = messageParsed[3];
    let luno = messageParsed[1];
    let messageSolicited = "";
    let status = "";
    switch (commandCode) {
        case '1': //Go in‐service (start‐up).
            status = buildSolicitedStatus("Ready");
            messageSolicited = `22\x1c${luno}\x1c\x1c${status}`;
            break;
        case '2': //Go out‐of‐service (shut‐down).
            status = buildSolicitedStatus("Ready");
            messageSolicited = `22\x1c${luno}\x1c\x1c${status}`;
            break;
        case '3': //Send configuration ID.
            break;
        case '4': //Send supply counters.
            break;
        case '7': //Send configuration information.
            break;
        default:
            console.log("Command code not found");
            break;
    }
    return messageSolicited;
}

//Data commands
export function parseDataCommand() {
    //code here
}

//Transaction reply
export function parseTransactionReply(msgReply) {

    console.log("REPLY: ", msgReply);
    const jsonReply = {
        atmCode: msgReply[1],
        nextState: msgReply[3],
        dispensation: msgReply[4],
        amount: msgReply[5],
    }
    const messageReply = JSON.stringify(jsonReply, null, 2);
    return messageReply;
}



export function buildSolicitedStatus(status) {
    let statusValue = "";
    switch (status) {
        case "Ready":
            statusValue = "9"; // 9 or B(Transaction reply)
            break;
        case "Command Reject":
            statusValue = "A"
            break;
        case "Specific Command Reject":
            statusValue = "C"
            break;
        default:
            statusValue = "A"
            break;
    }
    return statusValue;
}

//Checks first two bytes of incoming message to get the length
export function getIncomingMessageLength(message) {
    let len = parseInt(message.charCodeAt(0), 10) * 256 + parseInt(message.charCodeAt(1), 10);
    if (!isNaN(len))
        return len;
    else
        return 0;
}