import { createPool } from 'mysql2/promise';
import { DB_CONFIG } from './config.js';

export const pool = createPool(DB_CONFIG);

// Función para probar la conexión
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a la base de datos establecida correctamente');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
        return false;
    }
}

// Función para ejecutar queries
export async function executeQuery(query, params = []) {
    try {
        const [results] = await pool.execute(query, params);
        return results;
    } catch (error) {
        console.error('Error ejecutando query:', error.message);
        throw error;
    }
}
