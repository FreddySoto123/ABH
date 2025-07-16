import { Router } from "express";
import {
    getRedesSociales,
    getRedSocial,
    createRedSocial,
    updateRedSocial,
    deleteRedSocial,
    getAcademiaRedesSociales,
    createAcademiaRedSocial,
    deleteAcademiaRedSocial
} from "../controllers/redes.controllers.js";
const router = Router();

router.get('/redes-sociales', getRedesSociales);
router.get('/redes-sociales/:id', getRedSocial);
router.post('/redes-sociales', createRedSocial);
router.put('/redes-sociales/:id', updateRedSocial);
router.delete('/redes-sociales/:id', deleteRedSocial);
router.get('/academia-redes-sociales', getAcademiaRedesSociales);
router.post('/academia-redes-sociales', createAcademiaRedSocial);
router.delete('/academia-redes-sociales/:id_academia/:id_red_social', deleteAcademiaRedSocial);

export default router;
