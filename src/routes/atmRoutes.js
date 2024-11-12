import { Router } from 'express';
import { sendMessage, hostResponse } from '../modules/connectionModule.js';

const atmRoutes = Router();
     
//Transaccion request
atmRoutes.post("/", async (req, res) => {
    //Transaction request to host
    let message = `11\x1c013\x1c\x1c\x1c1:\x1c;4941906907406275=24122011126152600001?\x1c\x1cABC     \x1c000000002000\x1c89;<1:281?>34<82\x1c\x1c\x1c\x1c`;
    sendMessage(message);

    //Transaction reply to ATM
    let result = await hostResponse(); //Envia datos para presentar en pantalla, ya procesado por messageParse
    try {
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send('Error al procesar datos' + error.message)
    }
});

export default atmRoutes;