import express from "express";
import path from 'path'
import cors from 'cors';

//Import local files
import routes from './src/routes/routes.js';

const app = express();

//Use cors to http requests
app.use(cors());

//Routes
app.use(routes);

//Server 
app.listen(3000, () => console.log('Server running on port', 3000));