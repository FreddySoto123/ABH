import { Router } from "express";
import {
    getDirectivas,
    getDirectiva,
    createDirectiva,
    deleteDirectiva,
    getCargos
} from "../controllers/directivas.controllers.js";
const router = Router();

router.get('/directivas', getDirectivas);
router.get('/directivas/:id_persona/:id_cargo/:id_filial', getDirectiva);
router.post('/directivas', createDirectiva);
router.delete('/directivas/:id_persona/:id_cargo/:id_filial', deleteDirectiva);
router.get('/cargos', getCargos);

export default router;
