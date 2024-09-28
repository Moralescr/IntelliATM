import net from 'net';

//Set connection with host
export function connection(port, host) {

  //Create connection
  client = net.createConnection(port, host);
    
  if (connected == false) {
      client.on('connect', ()=> {
          console.log('ATM conectado');
          connected = true;
      });
  }
  
  client.on('data', (data) => {
      console.log("Servidor dice: ", data.toString());
  });

  client.on('error', (err) => {
      console.log("ATM se ha desconectado", err.message);
  });   
}