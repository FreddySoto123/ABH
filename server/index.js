import express from "express";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import personaRoutes from "./routes/personas.routes.js";

const app = express();

app.use(indexRoutes);
app.use(personaRoutes);

app.listen(PORT)
