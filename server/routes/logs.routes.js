import { Router } from "express";
import {
    getLogs,
    getLog,
    createLog,
    deleteLog,
    getLogsByPersona,
    getLogsByTabla
} from "../controllers/logs.controllers.js";
const router = Router();

router.get('/logs', getLogs);
router.get('/logs/:id', getLog);
router.post('/logs', createLog);
router.delete('/logs/:id', deleteLog);
router.get('/logs/persona/:id_persona', getLogsByPersona);
router.get('/logs/tabla/:tabla', getLogsByTabla);

export default router;
