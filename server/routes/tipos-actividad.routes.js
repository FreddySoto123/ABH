import { Router } from "express";
import {
    getTiposActividad,
    getTipoActividad,
    createTipoActividad,
    updateTipoActividad,
    deleteTipoActividad
} from "../controllers/tipos-actividad.controllers.js";
const router = Router();

router.get('/tipos-actividad', getTiposActividad);
router.get('/tipos-actividad/:id', getTipoActividad);
router.post('/tipos-actividad', createTipoActividad);
router.put('/tipos-actividad/:id', updateTipoActividad);
router.delete('/tipos-actividad/:id', deleteTipoActividad);

export default router;
