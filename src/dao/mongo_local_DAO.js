import {persistencia_default} from './persistencia_default.js';
import mongoose from 'mongoose'

export class MongoDB_local extends persistencia_default{
  constructor () {
    super('MongoDB_local', Connect, Create, Read, Read_find, Update, Delete)
  }
}

async function Connect (){
    try {
        const URI = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URI, 
            { 
              useNewUrlParser: true,
              useUnifiedTopology: true,
              serverSelectionTimeoutMS: 1000
            })    
        console.log('Conectado a la base de datos...');
        }
    catch(error) {
        console.log("db not running")
        ///throw `Error: ${error}`;
    }
}
async function Create (model, obj){
  try {
    const SaveModel = new model(obj)
    let res_data = await SaveModel.save()
    return res_data
    }
  catch(error) {
      console.log("db not running")
      ///throw `Error: ${error}`;
  }
}

async function Read(model){
  let res_data = await  model.find({})
    return res_data
}
async function Read_find(model,req_id){
  let res_data = await model.find({ id : req_id })
  return res_data
}
async function Update(model,qry, update){
  let res_data = model.updateOne(qry, update)
  return res_data
}
async function Delete(model, qry){
  try{
    let res_data = await model.deleteOne(qry)
    return res_data
  }
  catch(err){
    console.log(err)
  }
}