import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';

//Local files
import mainRoutes from './src/routes/mainRoutes.js';
import connectionRoutes from './src/routes/connectionRoutes.js';
import atmRoutes from './src/routes/atmRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());

//Routes
app.use("/", mainRoutes);
app.use("/connect", connectionRoutes);
app.use("/atm", atmRoutes);

//Server 
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)