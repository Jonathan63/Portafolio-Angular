import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Producto} from '../interfaces/producto.interfece';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    producto: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){
     this.http.get('https://angular-html-curso-17a6d.firebaseio.com/productos_idx.json')
     .subscribe((resp: Producto[]) => {
        console.log(resp);
        this.producto = resp;
//tiempo de carga de la pagina web
        setTimeout(()=>{
          this.cargando = false;
        }, 2000)
     });
   }


}
