import { Router } from "express";
import {
    getAcademiaRedesSociales,
    getAcademiaRedSocial,
    createAcademiaRedSocial,
    deleteAcademiaRedSocial
} from "../controllers/academia-redes.controllers.js";
const router = Router();

router.get('/academia-redes-sociales', getAcademiaRedesSociales);
router.get('/academia-redes-sociales/:id_academia/:id_red_social', getAcademiaRedSocial);
router.post('/academia-redes-sociales', createAcademiaRedSocial);
router.delete('/academia-redes-sociales/:id_academia/:id_red_social', deleteAcademiaRedSocial);

export default router;
