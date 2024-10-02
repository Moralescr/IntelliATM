import net from 'net';

let client = "";
let isConnected = false;

//Set connection with host
export function connection(host, port) {

    if (!isConnected) {
        //Create connection
        client = net.createConnection(port, host, () => {
            console.log('ATM CONECTADO');
            isConnected = true;  
            setTimeout(() => {
                console.log("Delayed for 1 second.");
            }, "3000");
        });
        
        //Connection error
        client.on('error', (error) => {
            console.log("ATM se ha desconectado: ", error.message);
        });  

        // IBM i response
        client.on('data', (data) => {
            console.log("servidor dice:", data.toString());
            sendMessage("Datos recibidos");
        });7
    }

    return isConnected;
}

//Get message length (Header)
export function getOutgoingMessageLength(data) {
    return String.fromCharCode(data.length / 256) + String.fromCharCode(data.length % 256);
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
