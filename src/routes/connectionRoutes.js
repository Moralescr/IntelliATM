import { Router } from 'express';
import { connection, sendMessage } from '../modules/connectionModule.js';

const router = Router();

//Request connection
router.post("/", (req, res)=>{
    let host = req.body.host;
    let port = req.body.port;

    let isConnected = connection(host, port);        
    return res.send(isConnected);
});

export default router;