import express from "express";
import { PORT } from "./config.js";
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
