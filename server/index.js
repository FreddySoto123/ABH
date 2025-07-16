import express from "express";
import { SERVER_CONFIG } from './utils/env.js';
import indexRoutes from "./routes/index.routes.js";
import personaRoutes from "./routes/personas.routes.js";
import academiaRoutes from './routes/academia.routes.js';
import librosRoutes from './routes/libros.routes.js';
import documentosRoutes from './routes/documentos.routes.js';
import actividadesRoutes from './routes/actividades.routes.js';
import filialesRoutes from './routes/filiales.routes.js';
import academicosRoutes from './routes/academicos.routes.js';
import directivasRoutes from './routes/directivas.routes.js';
import redesRoutes from './routes/redes.routes.js';
import mensajesRoutes from './routes/mensajes.routes.js';
import recorridosRoutes from './routes/recorridos.routes.js';
import logsRoutes from './routes/logs.routes.js';
import tiposDocumentoRoutes from './routes/tipos-documento.routes.js';
import tiposPersonaRoutes from './routes/tipos-persona.routes.js';
import gradosPersonaRoutes from './routes/grados-persona.routes.js';
import tiposAcademicoRoutes from './routes/tipos-academico.routes.js';
import tiposActividadRoutes from './routes/tipos-actividad.routes.js';
import cargosRoutes from './routes/cargos.routes.js';
import academiaRedesRoutes from './routes/academia-redes.routes.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para CORS (si es necesario)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(indexRoutes);
app.use(personaRoutes);
app.use(academiaRoutes);
app.use(librosRoutes);
app.use(documentosRoutes);
app.use(actividadesRoutes);
app.use(filialesRoutes);
app.use(academicosRoutes);
app.use(directivasRoutes);
app.use(redesRoutes);
app.use(mensajesRoutes);
app.use(recorridosRoutes);
app.use(logsRoutes);
app.use(tiposDocumentoRoutes);
app.use(tiposPersonaRoutes);
app.use(gradosPersonaRoutes);
app.use(tiposAcademicoRoutes);
app.use(tiposActividadRoutes);
app.use(cargosRoutes);
app.use(academiaRedesRoutes);

// Iniciar el servidor
app.listen(SERVER_CONFIG.PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${SERVER_CONFIG.PORT}`);
    console.log(`📊 Entorno: ${SERVER_CONFIG.NODE_ENV}`);
    console.log(`🌐 URL: http://localhost:${SERVER_CONFIG.PORT}`);
});
