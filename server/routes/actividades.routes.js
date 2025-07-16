import { Router } from "express";
import {
    getActividades,
    getActividad,
    createActividad,
    updateActividad,
    deleteActividad,
    getTiposActividad
} from "../controllers/actividades.controllers.js";
const router = Router();

router.get('/actividades', getActividades);
router.get('/actividades/:id', getActividad);
router.post('/actividades', createActividad);
router.put('/actividades/:id', updateActividad);
router.delete('/actividades/:id', deleteActividad);
router.get('/tipos-actividad', getTiposActividad);

export default router;
