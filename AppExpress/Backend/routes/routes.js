import express from "express";
import {
    getAllMangas,
    getManga,
    createManga,
    updateManga,
    deleteManga,
    loginUser
} from "../controllers/MangaController.js";

const router = express.Router();

// Rutas para mangas
router.get('/mangas', getAllMangas);
router.get('/mangas/:id', getManga);
router.post('/mangas', createManga);
router.put('/mangas/:id', updateManga);
router.delete('/mangas/:id', deleteManga);

// Ruta para login
router.post('/login', loginUser); 

export default router;
