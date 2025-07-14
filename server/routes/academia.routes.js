import { Router } from "express";
import {
    getAcademiaInfo,
    updateAcademiaInfo,
    createAcademiaInfo
} from "../controllers/academia.controllers.js";

const router = Router();

router.get('/info', getAcademiaInfo);
router.post('/info', createAcademiaInfo);
router.put('/info', updateAcademiaInfo);

export default router;