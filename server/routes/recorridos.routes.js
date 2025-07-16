import { Router } from "express";
import {
    getRecorridosVirtuales,
    getRecorridoVirtual,
    createRecorridoVirtual,
    updateRecorridoVirtual,
    deleteRecorridoVirtual
} from "../controllers/recorridos.controllers.js";
const router = Router();

router.get('/recorridos-virtuales', getRecorridosVirtuales);
router.get('/recorridos-virtuales/:id', getRecorridoVirtual);
router.post('/recorridos-virtuales', createRecorridoVirtual);
router.put('/recorridos-virtuales/:id', updateRecorridoVirtual);
router.delete('/recorridos-virtuales/:id', deleteRecorridoVirtual);

export default router;
