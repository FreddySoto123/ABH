import { Router } from "express";
import {
    getMensajesContacto,
    getMensajeContacto,
    createMensajeContacto,
    deleteMensajeContacto
} from "../controllers/mensajes.controllers.js";
const router = Router();

router.get('/mensajes-contacto', getMensajesContacto);
router.get('/mensajes-contacto/:id', getMensajeContacto);
router.post('/mensajes-contacto', createMensajeContacto);
router.delete('/mensajes-contacto/:id', deleteMensajeContacto);

export default router;
