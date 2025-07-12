import express from "express";
import morgan from "morgan";
import { PORT } from "./config.js";
import { testConnection, executeQuery } from "./db.js";

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS para desarrollo
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'Servidor ABH funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta para probar la conexión a la base de datos
app.get('/api/test-db', async (req, res) => {
    try {
        const isConnected = await testConnection();
        if (isConnected) {
            // Obtener información de las tablas
            const tables = await executeQuery('SHOW TABLES');
            res.json({
                status: 'success',
                message: 'Conexión a la base de datos exitosa',
                tables: tables.map(table => Object.values(table)[0])
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'No se pudo conectar a la base de datos'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para obtener todas las personas
app.get('/api/personas', async (req, res) => {
    try {
        const personas = await executeQuery('SELECT * FROM Persona');
        res.json({
            status: 'success',
            data: personas
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para crear una persona
app.post('/api/personas', async (req, res) => {
    try {
        const { id_grado, id_tipo_persona, nombre, apellido, imagen_perfil_url } = req.body;
        const result = await executeQuery(
            'INSERT INTO Persona (id_grado, id_tipo_persona, nombre, apellido, imagen_perfil_url) VALUES (?, ?, ?, ?, ?)',
            [id_grado, id_tipo_persona, nombre, apellido, imagen_perfil_url]
        );
        res.json({
            status: 'success',
            message: 'Persona creada exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    
    // Probar conexión a la base de datos al iniciar
    console.log('🔍 Probando conexión a la base de datos...');
    await testConnection();
});
