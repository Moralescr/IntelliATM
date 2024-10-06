import dotenv from 'dotenv';
import {createPool} from 'mysql2/promise';

dotenv.config();

const dbName = process.env.DATABASE;
const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;

// Create pool connection
export const pool = createPool({
    host:"localhost",
    port:3306,
    database: dbName,
    user: dbUser,
    password: dbPassword,
});

