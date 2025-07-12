import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: "localhost",
    port: "3307",
    user: "abh_user",
    password: "abh_password",
    database: "abhm",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Pool de conexiones a la base de datos creado.');