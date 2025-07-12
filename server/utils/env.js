import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Obtiene una variable de entorno con validación
 * @param {string} key - Nombre de la variable de entorno
 * @param {string} defaultValue - Valor por defecto (opcional)
 * @param {boolean} required - Si la variable es requerida (opcional, por defecto true)
 * @returns {string} - Valor de la variable de entorno
 */
export function getEnvVar(key, defaultValue = null, required = true) {
    const value = process.env[key];
    
    if (!value && required && defaultValue === null) {
        throw new Error(`Variable de entorno requerida faltante: ${key}`);
    }
    
    return value || defaultValue;
}

/**
 * Obtiene una variable de entorno como número entero
 * @param {string} key - Nombre de la variable de entorno
 * @param {number} defaultValue - Valor por defecto (opcional)
 * @returns {number} - Valor de la variable de entorno como número
 */
export function getEnvInt(key, defaultValue = null) {
    const value = getEnvVar(key, defaultValue?.toString(), defaultValue !== null);
    const parsed = parseInt(value, 10);
    
    if (isNaN(parsed)) {
        throw new Error(`Variable de entorno ${key} debe ser un número válido`);
    }
    
    return parsed;
}

/**
 * Obtiene una variable de entorno como booleano
 * @param {string} key - Nombre de la variable de entorno
 * @param {boolean} defaultValue - Valor por defecto (opcional)
 * @returns {boolean} - Valor de la variable de entorno como booleano
 */
export function getEnvBool(key, defaultValue = null) {
    const value = getEnvVar(key, defaultValue?.toString(), defaultValue !== null);
    return value === 'true' || value === '1' || value === 'yes';
}

// Configuración del servidor
export const SERVER_CONFIG = {
    PORT: getEnvInt('PORT', 4000),
    NODE_ENV: getEnvVar('NODE_ENV', 'development', false),
    IS_PRODUCTION: getEnvVar('NODE_ENV', 'development', false) === 'production',
    IS_DEVELOPMENT: getEnvVar('NODE_ENV', 'development', false) === 'development'
};

// Configuración de la base de datos
export const DB_CONFIG = {
    HOST: getEnvVar('DB_HOST'),
    PORT: getEnvInt('DB_PORT'),
    USER: getEnvVar('DB_USER'),
    PASSWORD: getEnvVar('DB_PASSWORD'),
    DATABASE: getEnvVar('DB_DATABASE'),
    CONNECTION_LIMIT: getEnvInt('DB_CONNECTION_LIMIT', 10),
    QUEUE_LIMIT: getEnvInt('DB_QUEUE_LIMIT', 0),
    WAIT_FOR_CONNECTIONS: getEnvBool('DB_WAIT_FOR_CONNECTIONS', true)
};

// Validar configuración al importar
console.log('✅ Variables de entorno cargadas correctamente');
console.log(`📊 Entorno: ${SERVER_CONFIG.NODE_ENV}`);
console.log(`🚀 Puerto: ${SERVER_CONFIG.PORT}`);
console.log(`🗄️  Base de datos: ${DB_CONFIG.DATABASE} en ${DB_CONFIG.HOST}:${DB_CONFIG.PORT}`);
