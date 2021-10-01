export class ListaCarritos{
    #vLista
    constructor(vCarritos){
        this.vLista=vCarritos
    }
    getCarritos(){
        return this.vLista
    }
    getCarrito(id){
        let busq= this.vLista.find(x=>x.id==id)
        return busq
    }
    setCarrito(crts, id){
        try{
            crts.id=id
            this.vLista.push(crts)
        }
        catch(err){
            console.log(err)
        }
        let busq= this.vLista.find(x=>x.id==id)
        return busq
    }
    updateCarrito(crts, id){
        try{
            let index = this.vLista.findIndex(x=>x.id==id)
            this.vLista[index]=crts
            return this.vLista[index]
        }
        catch(err){
            console.log(err)
        }
    }
    eliminateCarrito(id){
        try{
            let index = this.vLista.findIndex(x=>x.id==id)
            //shallow copy. El objeto se borra con splice y una referencia no me sirve. 
            var auxEliminado = JSON.parse(JSON.stringify(this.vLista[index]));
            this.vLista.splice(index,1)
            for(let i=index;i<this.vLista.length;i++)
            this.vLista[i].id--
        }
        catch(err){
            console.log(err)
        }
        return auxEliminado
    }
}

let vLoteCarritos =
[

	{
        id:1,
        timestamp:"",
        //carrito:CrtsProd,
	},
	{
        id:2,
        timestamp:"",
        //carrito:listaCrtsOtro,
	},
	{
        id:3,
        timestamp:"",
        //carrito:listaCrtsOtro2,
	}
]
let listaCrts = new ListaCarritos(vLoteCarritos)

export {vLoteCarritos, listaCrts}