import { Router } from "express";
import {
    getGradosPersona,
    getGradoPersona,
    createGradoPersona,
    updateGradoPersona,
    deleteGradoPersona
} from "../controllers/grados-persona.controllers.js";
const router = Router();

router.get('/grados-persona', getGradosPersona);
router.get('/grados-persona/:id', getGradoPersona);
router.post('/grados-persona', createGradoPersona);
router.put('/grados-persona/:id', updateGradoPersona);
router.delete('/grados-persona/:id', deleteGradoPersona);

export default router;
