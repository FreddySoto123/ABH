import { Router } from "express";
import {
    getTiposPersona,
    getTipoPersona,
    createTipoPersona,
    updateTipoPersona,
    deleteTipoPersona
} from "../controllers/tipos-persona.controllers.js";
const router = Router();

router.get('/tipos-persona', getTiposPersona);
router.get('/tipos-persona/:id', getTipoPersona);
router.post('/tipos-persona', createTipoPersona);
router.put('/tipos-persona/:id', updateTipoPersona);
router.delete('/tipos-persona/:id', deleteTipoPersona);

export default router;
