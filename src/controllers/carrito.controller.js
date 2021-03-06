import {persistence} from '../dao/persistence.js'
import {model as prodModel} from '../models/producto.model.js'
import {model} from '../models/carrito.model.js'

export const getCarrito = (req,res, next)=>{
    try{
        persistence.Read_all(model)
        .then((response)=>{
            res.json(response)
        })
    }
        catch(err){
    }
};

export const getCarrito_Codigo = (req,res, next)=>{
    let params = req.params;
    let id = params.id;
    let qry = {id: id}
        try{
        persistence.Read_qry(model, qry)
        .then((response)=>{
                res.json(response)
            })   
        }
        catch(err)
        {
            next(err)
        }
};

export const patchCarrito =  (req,res,next)=>{
    /*let id = req.params.id
    let obj = req.body;
    let qry = {'id': id}
    let update = {$set: obj}
    try{
        persistence.Update(model,qry, update)
        .then((response)=>{
            //res.send(response)
            next()
        })
    }
    catch(err)
    {
        //console.log(err)
        next(err)
    }*/
};
export const putCarrito =  (req,res,next)=>{
    let id = req.params.id
    let prod = req.body;
    let qry = {'id': id}
    let update = {$set: prod}
    try{
        persistence.Update(model,qry, update)
        .then((response)=>{
            res.json(response)
        })
    }
    catch(err)
    {
        next(err)
    }
};
export const deleteCarrito = (req,res,next)=>{
    let id = req.params.id
    let qry = {'id': id}
    try{
        persistence.Delete(model,qry)
        .then((response)=>{
            res.json(response)
        })
    }
    catch(err)
    {
        next(err)
    }
};

export const postCarrito = (req,res,next)=>{
        try{
            persistence.Create(model)
            .then((response)=>{
                res.json(response)
            })

        }
        catch(err)
        {
            console.log(err)
            next(err)
        }

};
export async function postAddProd(req,res,next){

    let carritoReq = req.body.carritoId
    
    let ItemReq = {
        product: req.body.productId,
        quantity: parseInt(req.body.quantity),
        total:0
    }

    let itemQry = {id: ItemReq.product}
    let carritoQry = {id: carritoReq}

    try{
        //carrito exists in db
        let carritoInfo = await persistence.Read_qry(model, carritoQry)
            if(carritoInfo.length===0)
            {
                return res.status(500).json({
                    type: "Carrito Not Found",
                    msg: "Invalid request"
                })
            }
        //product exists in db
        let prodInfo = await persistence.Read_qry(prodModel, itemQry)
            if(prodInfo.length===0)
            {
                return res.status(500).json({
                    type: "Producto Not Found",
                    msg: "Invalid request"
                })
            }

        ItemReq.total = parseInt(prodInfo[0].precio * ItemReq.quantity)
        //product is already in carrito
            const indexFound = carritoInfo[0].listaItems.findIndex(item => item.product._id == ItemReq.product);
                if(indexFound!=-1){
                    carritoInfo[0].listaItems[indexFound].quantity+=ItemReq.quantity
                    carritoInfo[0].listaItems[indexFound].total+=ItemReq.total
                    if(carritoInfo[0].listaItems[indexFound].total<=0)
                        carritoInfo[0].listaItems[indexFound].total=0
                    if(carritoInfo[0].listaItems[indexFound].quantity<=0)
                        carritoInfo[0].listaItems.splice(indexFound,1)
                        console.log(carritoInfo[0].listaItems)
                }
            //product is not in carrito
                else{
                    if(ItemReq.quantity<=0)
                    {
                        return res.status(500).json({
                            type: "this item was not in the chart",
                            msg: "Invalid request"
                        })
                    }
                    carritoInfo[0].listaItems.push(ItemReq)
                }
        //actualizo el total del carrito
        if(carritoInfo[0].listaItems.length>0){
            carritoInfo[0].total = carritoInfo[0].listaItems.map(item => item.total).reduce((acc, next) => acc + next);
        }
        else{
            carritoInfo[0].total = 0
        }
        persistence.partialUpdate(carritoInfo[0]).then(response=>{
            res.json(response)
        })
    }
    catch(err){
        next(err)
    }
};
