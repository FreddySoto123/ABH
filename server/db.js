import { createPool } from 'mysql2/promise';
import { DB_CONFIG } from './utils/env.js';

export const pool = createPool({
    host: DB_CONFIG.HOST,
    port: DB_CONFIG.PORT,
    user: DB_CONFIG.USER,
    password: DB_CONFIG.PASSWORD,
    database: DB_CONFIG.DATABASE,
    waitForConnections: DB_CONFIG.WAIT_FOR_CONNECTIONS,
    connectionLimit: DB_CONFIG.CONNECTION_LIMIT,
    queueLimit: DB_CONFIG.QUEUE_LIMIT
});

console.log('🔗 Pool de conexiones a la base de datos creado exitosamente');
