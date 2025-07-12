import { Router } from "express";
import {
    getPersonas,
    getPersona,
    createPersona,
    updatePersona,
    deletePersona,
    getGrados,
    getTiposPersona
} from "../controllers/personas.controllers.js";
const router = Router();

// Rutas CRUD para personas
router.get('/personas', getPersonas);
router.get('/personas/:id', getPersona);
router.post('/personas', createPersona);
router.put('/personas/:id', updatePersona);
router.delete('/personas/:id', deletePersona);

// Rutas auxiliares
router.get('/grados', getGrados);
router.get('/tipos-persona', getTiposPersona);

export default router;
