export class ListaProductos{
    #vLista
    constructor(vProductos){
        this.vLista=vProductos
    }
    getProductos(){
        return this.vLista
    }
    getProducto(codigo){
        let busq= this.vLista.find(x=>x.codigo==codigo)
        return busq
    }
    setProducto(prod){
            let index = this.vLista.find(e=>e.codigo==prod.codigo)
            if(index===undefined)
            {
                this.vLista.push(prod)
                return prod
            }
            else
            {
                //throw new Error({'Error':prod});
                return {}
            }

    }
    updateProducto(prod, id){
        try{
            let index = this.vLista.findIndex(x=>x.id==id)
            this.vLista[index]=prod
            return this.vLista[index]
        }
        catch(err){
            console.log(err)
        }
    }
    eliminateProducto(id){
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

let vLoteProductos =
[

	{
        id:1,
        timestamp:"",
        nombre:"reloj",
        descripcion:"",
        codigo:"",
        foto:"https://w7.pngwing.com/pngs/859/290/png-transparent-table-glass-drawing-idea-glass-angle-white-thumbnail.png",
        precio:"434",
        stock:"434",
	},
	{
        id:2,
        timestamp:"",
        nombre:"",
        descripcion:"",
        codigo:"",
        foto:"https://e7.pngegg.com/pngimages/764/942/png-clipart-alarm-clocks-watch-manecilla-clock-alarm-clocks-watch.png",
        precio:"434",
        stock:"434",
	},
	{
        id:3,
        timestamp:"",
        nombre:"reloj",
        descripcion:"",
        codigo:"",
        foto:"https://cdn-icons-png.flaticon.com/512/1378/1378481.png",
        precio:"434",
        stock:"434",
	}
]
let listaProd = new ListaProductos(vLoteProductos)

export {vLoteProductos, listaProd}