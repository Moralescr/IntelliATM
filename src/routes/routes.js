
import { query, Router } from 'express';
import { connection } from '../modules/connectionModule.js';

const router = Router();

//Main server page
router.get("/", (req, res) => {
    res.send("<h1>Intelli ATM - 2024</>");
});

//Request connection
router.post("/api/connect", (req, res)=>{
    console.log(req.body);
    /*host = req.body.host;
    port = req.body.port;
    connection(host, port);*/
});

//Send message to host
router.post("/message", (req, res)=>{
    enviaMensaje();
});

export default router;