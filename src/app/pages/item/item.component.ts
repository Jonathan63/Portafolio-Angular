import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
//propiedades
producto: ProductoDescripcion;
id: string;

  constructor( //inyecciones a los servicios
              private route: ActivatedRoute,
              private productoService: ProductosService) { }

  ngOnInit(): void {

      //llamar instrucciones
      this.route.params
      .subscribe (parametros => {
//referencia al servicio
      this.productoService.getProducto(parametros ['id'])
      .subscribe ((producto: ProductoDescripcion) => {
        this.id = parametros['id'];
        this.producto = producto;
      }) ;
      });

  }

}
