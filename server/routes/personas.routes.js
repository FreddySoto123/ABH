import { Router } from "express";
import {
    getPersonas,
    getPersona,
    createPersona,
    updatePersona,
    deletePersona
} from "../controllers/personas.controllers.js";
const router = Router();

router.get('/personas', getPersonas);
router.get('/personas/:id', getPersona);
router.post('/personas', createPersona);
router.put('/personas/:id', updatePersona);
router.delete('/personas/:id', deletePersona);

export default router;