import { Router } from "express";
import {
    getTiposAcademico,
    getTipoAcademico,
    createTipoAcademico,
    updateTipoAcademico,
    deleteTipoAcademico
} from "../controllers/tipos-academico.controllers.js";
const router = Router();

router.get('/tipos-academico', getTiposAcademico);
router.get('/tipos-academico/:id', getTipoAcademico);
router.post('/tipos-academico', createTipoAcademico);
router.put('/tipos-academico/:id', updateTipoAcademico);
router.delete('/tipos-academico/:id', deleteTipoAcademico);

export default router;
