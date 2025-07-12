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

// Ruta para obtener todas las personas con información relacionada
app.get('/api/personas', async (req, res) => {
    try {
        const personas = await executeQuery(`
            SELECT 
                p.id_persona,
                p.nombre_persona,
                p.apellido_persona,
                p.imagen_perfil_url_persona,
                g.nombre_grado_persona,
                g.acronimo_grado_persona,
                t.nombre_tipo_persona
            FROM Persona p
            LEFT JOIN Grado_Persona g ON p.id_grado = g.id_grado_persona
            LEFT JOIN Tipo_Persona t ON p.id_tipo_persona = t.id_tipo_persona
        `);
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
        const { id_grado, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona } = req.body;
        const result = await executeQuery(
            'INSERT INTO Persona (id_grado, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona) VALUES (?, ?, ?, ?, ?)',
            [id_grado, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona]
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

// ==================== RUTAS PARA LIBROS ====================

// Obtener todos los libros
app.get('/api/libros', async (req, res) => {
    try {
        const libros = await executeQuery(`
            SELECT 
                l.*,
                p.nombre_persona,
                p.apellido_persona,
                g.acronimo_grado_persona
            FROM Libro l
            LEFT JOIN Persona p ON l.id_persona = p.id_persona
            LEFT JOIN Grado_Persona g ON p.id_grado = g.id_grado_persona
        `);
        res.json({
            status: 'success',
            data: libros
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Obtener un libro por ID
app.get('/api/libros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await executeQuery(`
            SELECT 
                l.*,
                p.nombre_persona,
                p.apellido_persona,
                g.nombre_grado_persona,
                g.acronimo_grado_persona
            FROM Libro l
            LEFT JOIN Persona p ON l.id_persona = p.id_persona
            LEFT JOIN Grado_Persona g ON p.id_grado = g.id_grado_persona
            WHERE l.id_libro = ?
        `, [id]);
        
        if (libro.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Libro no encontrado'
            });
        }
        
        res.json({
            status: 'success',
            data: libro[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA DOCUMENTOS ====================

// Obtener todos los documentos
app.get('/api/documentos', async (req, res) => {
    try {
        const documentos = await executeQuery(`
            SELECT 
                d.*,
                td.nombre_tipo_documento,
                p.nombre_persona,
                p.apellido_persona,
                g.acronimo_grado_persona
            FROM Documento d
            LEFT JOIN Tipo_Documento td ON d.id_tipo_documento = td.id_tipo_documento
            LEFT JOIN Persona p ON d.id_persona = p.id_persona
            LEFT JOIN Grado_Persona g ON p.id_grado = g.id_grado_persona
        `);
        res.json({
            status: 'success',
            data: documentos
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA ACTIVIDADES ====================

// Obtener todas las actividades
app.get('/api/actividades', async (req, res) => {
    try {
        const actividades = await executeQuery(`
            SELECT 
                a.*,
                ta.nombre_tipo_actividad
            FROM Actividad a
            LEFT JOIN Tipo_Actividad ta ON a.id_tipo_actividad = ta.id_tipo_actividad
            ORDER BY a.fecha_actividad DESC
        `);
        res.json({
            status: 'success',
            data: actividades
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA ACADEMIA ====================

// Obtener información de la academia
app.get('/api/academia', async (req, res) => {
    try {
        const academia = await executeQuery(`
            SELECT 
                a.*,
                GROUP_CONCAT(DISTINCT CONCAT(rs.nombre_red_social, ':', rs.direccion_url_red_social) SEPARATOR '|') as redes_sociales
            FROM Academia a
            LEFT JOIN Academia_Red_Social ars ON a.id_academia = ars.id_academia
            LEFT JOIN Red_Social rs ON ars.id_red_social = rs.id_red_social
            GROUP BY a.id_academia
        `);
        res.json({
            status: 'success',
            data: academia[0] || null
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA DIRECTIVA ====================

// Obtener la directiva
app.get('/api/directiva', async (req, res) => {
    try {
        const directiva = await executeQuery(`
            SELECT 
                d.*,
                p.nombre_persona,
                p.apellido_persona,
                p.imagen_perfil_url_persona,
                g.nombre_grado_persona,
                g.acronimo_grado_persona,
                c.nombre_cargo,
                f.nombre_filial
            FROM Directiva d
            LEFT JOIN Persona p ON d.id_persona = p.id_persona
            LEFT JOIN Grado_Persona g ON p.id_grado = g.id_grado_persona
            LEFT JOIN Cargo c ON d.id_cargo = c.id_cargo
            LEFT JOIN Filial f ON d.id_filial = f.id_filial
        `);
        res.json({
            status: 'success',
            data: directiva
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA RECORRIDOS VIRTUALES ====================

// Obtener todos los recorridos virtuales
app.get('/api/recorridos-virtuales', async (req, res) => {
    try {
        const recorridos = await executeQuery('SELECT * FROM Recorrido_virtual');
        res.json({
            status: 'success',
            data: recorridos
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// ==================== RUTAS PARA MENSAJES DE CONTACTO ====================

// Crear un mensaje de contacto
app.post('/api/contacto', async (req, res) => {
    try {
        const { mensaje, email_remitente, nombre_remitente } = req.body;
        const result = await executeQuery(
            'INSERT INTO Mensaje_Contacto (fecha_envio_mensaje_contacto, mensaje_mensaje_contacto, email_remitente_mensaje_contacto, nombre_remitente_mensaje_contacto) VALUES (CURDATE(), ?, ?, ?)',
            [mensaje, email_remitente, nombre_remitente]
        );
        res.json({
            status: 'success',
            message: 'Mensaje enviado exitosamente',
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
