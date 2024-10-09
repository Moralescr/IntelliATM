import {sendMessage} from '../modules/connectionModule.js';
import {pool} from '../database/dbConnection.js';

//Messages replies
export function getATMessageToReply(data) {
    let request = data.toString();
    let messageResponse = "Received";
    return messageResponse;
}

/*Get solicited messages
    @Start up
    @Out of service
    @Counters
    @Configuration information
*/
export function setSolicitedMessages(){
    
} 

