import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: "localhost",
    port: "3307",
    user: "abh_user",
    password: "abh_password",
    database: "abhm"
});