import { Router } from 'express';
import {getATMessageToReply} from '../modules/atmModule.js';

const atmRoutes = Router();

//Main server page
atmRoutes.get("/", (req, res) => {
    //API 
});

export default atmRoutes;