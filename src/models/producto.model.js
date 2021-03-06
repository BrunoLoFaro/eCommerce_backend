import mongoose from 'mongoose'
class Producto{
    constructor(id, timestamp, nombre,descripcion, codigo, foto, precio, stock){
        this.timestamp=timestamp
        this.nombre=nombre
        this.descripcion=descripcion
        this.codigo=codigo
        this.foto=foto
        this.precio=precio
        this.stock=stock
    }
}
const productosCollection = 'productos'
const productosSchema = new mongoose.Schema({
    timestamp:{type:String, require: true, max:100},
    nombre:{type:String, require: true, max:100},
    descripcion:{type:String, require: true, max:100},
    codigo:{type:String, require: true, max:100},
    foto:{type:String, require: true, max:100},
    precio:{type:Number, require: true, max:5000},
    stock:{type:Number, require: true, max:100},
})

const Mongo = mongoose.model(productosCollection, productosSchema);

let Model = Producto

const model = {Model, Mongo}

export {model}