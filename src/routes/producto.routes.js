import {Router} from "express"
import multer from 'multer'
import {checkIsInRole} from '../util/auth.methods.js';
import {ROLES} from '../constants/constants.js';
import {
    getProducto,
    getProducto_Codigo,
    postProducto,
    patchProducto,
    putProducto,
    deleteProducto,
} from "../controllers/producto.controller.js"

export const productoRouter = Router()

productoRouter
    .get("/", getProducto)
    .get("/:id", getProducto_Codigo)
    .post("/",
        checkIsInRole(ROLES.Admin),
        postProducto)
    .patch("/:id", 
        checkIsInRole(ROLES.Admin),
        patchProducto)
    .put("/:id", 
        checkIsInRole(ROLES.Admin),
        putProducto)
    .delete("/:id", 
        checkIsInRole(ROLES.Admin),
        deleteProducto);