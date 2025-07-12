import express from "express";
import { SERVER_CONFIG } from './utils/env.js';
import indexRoutes from "./routes/index.routes.js";
import personaRoutes from "./routes/personas.routes.js";

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

// Iniciar el servidor
app.listen(SERVER_CONFIG.PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${SERVER_CONFIG.PORT}`);
    console.log(`📊 Entorno: ${SERVER_CONFIG.NODE_ENV}`);
    console.log(`🌐 URL: http://localhost:${SERVER_CONFIG.PORT}`);
});
