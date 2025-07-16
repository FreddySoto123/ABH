import { Router } from "express";
import {
    getDocumentos,
    getDocumento,
    createDocumento,
    updateDocumento,
    deleteDocumento,
    getTiposDocumento
} from "../controllers/documentos.controllers.js";
const router = Router();

router.get('/documentos', getDocumentos);
router.get('/documentos/:id', getDocumento);
router.post('/documentos', createDocumento);
router.put('/documentos/:id', updateDocumento);
router.delete('/documentos/:id', deleteDocumento);
router.get('/tipos-documento', getTiposDocumento);

export default router;
