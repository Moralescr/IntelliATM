import { Router } from 'express';
import { connection } from '../modules/connectionModule.js';

const router = Router();

//Request connection
router.post("/", (req, res)=>{
    //console.log(req.body);
    host = req.body.host;
    port = req.body.port;
    //connection(host, port);
});

//Send message to host
router.post("/message", (req, res)=>{
    console.log(req.body);
    //enviaMensaje();
});

export default router;