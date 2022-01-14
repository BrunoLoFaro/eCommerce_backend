import mongoose from 'mongoose'
const productosCollection = 'productos'
const productoschema = new mongoose.Schema({
    id:{type:Number, require: true},
    timestamp:{type:String, require: true, max:100},
    nombre:{type:String, require: true, max:100},
    descripcion:{type:String, require: true, max:100},
    codigo:{type:String, require: true, max:100},
    foto:{type:String, require: true, max:100},
    precio:{type:Number, require: true, max:5000},
    stock:{type:Number, require: true, max:100},
})

export const productoModel = mongoose.model(productosCollection, productoschema);