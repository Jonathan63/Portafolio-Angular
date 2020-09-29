import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { promise } from 'protractor';
import {Producto} from '../interfaces/producto.interfece';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    producto: Producto[] = [];
    productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-curso-17a6d.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) => {
         this.producto = resp;
 //tiempo de carga de la pagina web
         setTimeout(()=>{
           this.cargando = false;
         }, 2000)
         resolve();
      });
    });

   }
   //obtener un producto
   getProducto (id: string ){
    return this.http.get(`https://angular-html-curso-17a6d.firebaseio.com/productos/${id}.json`)
   }

  buscarProducto(termino: string){

    if( this.producto.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtro
        this.filtrarProductos( termino );
      });
    }else{
//aplicar filtro
this.filtrarProductos( termino );
    }
  }


  private filtrarProductos(termino: string){
    console.log(this.producto);
    this.productosFiltrado = [];

    this.producto.forEach( prod => {
        if(prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0){
          this.productosFiltrado.push( prod );
        }
    });
  }
}
