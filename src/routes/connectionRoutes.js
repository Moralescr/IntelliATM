import { Router } from 'express';
import {connection, isConnected} from '../modules/connectionModule.js';

const connectionRoutes = Router();

//Request connection
connectionRoutes.post("/", (req, res) => {
    let host = req.body.host;
    let port = req.body.port;

    //Set ATM connection
    connection(host, port); 

    setTimeout(() => {
        return res.send(isConnected);
    }, 3000);
});

export default connectionRoutes;