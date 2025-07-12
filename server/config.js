import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || 'abh_user',
    password: process.env.DB_PASSWORD || 'abh_password',
    database: process.env.DB_NAME || 'abhm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};
