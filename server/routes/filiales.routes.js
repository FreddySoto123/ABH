import { Router } from "express";
import {
    getFiliales,
    getFilial,
    createFilial,
    updateFilial,
    deleteFilial
} from "../controllers/filiales.controllers.js";
const router = Router();

router.get('/filiales', getFiliales);
router.get('/filiales/:id', getFilial);
router.post('/filiales', createFilial);
router.put('/filiales/:id', updateFilial);
router.delete('/filiales/:id', deleteFilial);

export default router;
