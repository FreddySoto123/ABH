import { Router } from "express";
import {
    getAcademicos,
    getAcademico,
    createAcademico,
    updateAcademico,
    deleteAcademico,
    getTiposAcademico
} from "../controllers/academicos.controllers.js";
const router = Router();

router.get('/academicos', getAcademicos);
router.get('/academicos/:id', getAcademico);
router.post('/academicos', createAcademico);
router.put('/academicos/:id', updateAcademico);
router.delete('/academicos/:id', deleteAcademico);
router.get('/tipos-academico', getTiposAcademico);

export default router;
