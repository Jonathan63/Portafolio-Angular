import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    cargando = false;
  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){
     this.http.get('https://angular-html-curso-17a6d.firebaseio.com/productos_idx.json')
     .subscribe((resp: []) => {
        console.log(resp);

        this.cargando = false;
     });
   }


}
