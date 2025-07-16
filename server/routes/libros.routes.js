import { Router } from "express";
import {
    getLibros,
    getLibro,
    createLibro,
    updateLibro,
    deleteLibro
} from "../controllers/libros.controllers.js";
const router = Router();

router.get('/libros', getLibros);
router.get('/libros/:id', getLibro);
router.post('/libros', createLibro);
router.put('/libros/:id', updateLibro);
router.delete('/libros/:id', deleteLibro);

export default router;
