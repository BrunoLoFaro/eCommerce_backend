import {Router} from "express"
import {upload} from '../middleware/multer.config.js'
import {
    getUsuario,
    getUsuario_Codigo,
    postUsuario,
    patchUsuario,
    putUsuario,
    deleteUsuario,
} from "../controllers/usuario.controller.js"

export const usuarioRouter = Router()

usuarioRouter
    .get("/", getUsuario)
    .get("/:id", getUsuario_Codigo)
    .post("/", postUsuario)
    .put("/:id", putUsuario)
    .patch("/avatar/:id", patchUsuario, upload.single('avatar'))
    .delete("/:id", deleteUsuario);