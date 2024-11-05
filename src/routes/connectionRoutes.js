import { Router } from 'express';
import { connect } from '../modules/connectionModule.js';

const connectionRoutes = Router();

//Request connection
connectionRoutes.post("/", async(req, res) => {

    let host = req.body.host;
    let port = req.body.port;
    //Set ATM connection
    const connectionStatus = await connect(host, port);
    try {
        console.log('Estado de la conexión: ', connectionStatus);
        return res.send(connectionStatus);
    } catch (error) {
        console.log('Error de la conexión: ', error);
        return res.status(500).send('Error al conectar al ATM: ' + error.message)
    }
});

export default connectionRoutes;