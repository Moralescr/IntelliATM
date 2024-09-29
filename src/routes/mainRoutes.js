import { Router } from 'express';

const mainRoutes = Router();

//Main server page
mainRoutes.get("/", (req, res) => {
    res.send("<h1>Intelli ATM - 2024</>");
});

export default mainRoutes;