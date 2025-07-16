import { Router } from "express";
import {
    getTiposDocumento,
    getTipoDocumento,
    createTipoDocumento,
    updateTipoDocumento,
    deleteTipoDocumento
} from "../controllers/tipos-documento.controllers.js";
const router = Router();

router.get('/tipos-documento', getTiposDocumento);
router.get('/tipos-documento/:id', getTipoDocumento);
router.post('/tipos-documento', createTipoDocumento);
router.put('/tipos-documento/:id', updateTipoDocumento);
router.delete('/tipos-documento/:id', deleteTipoDocumento);

export default router;
