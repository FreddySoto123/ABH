export const PORT = process.env.PORT || 4000;

export const DB_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'abh_user',
    password: process.env.DB_PASSWORD || 'abh_password',
    database: process.env.DB_NAME || 'mi_base_de_datos',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};
