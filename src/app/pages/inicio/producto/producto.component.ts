import { Component, Input, OnInit } from '@angular/core';
import { ProductosService } from '../../../core/services/productos.service';
import { Producto } from '../../../shared/models/Producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export default class ProductoComponent implements OnInit{
  @Input("id") idProducto!:string;
  productoTarget:any = {};
  cantProducto:number = 1;

  constructor(private productoService:ProductosService, private carritoService:CarritoService, private router:Router){}

  ngOnInit(): void {
    console.log(this.idProducto);
    this.buscarProducto(this.idProducto);
  }

  buscarProducto(id: string): void {
    console.log(id);
    
    this.productoService.getProductoById(id).subscribe(
      (producto: any) => {
        console.log(producto); // Aquí puedes trabajar con el producto recibido
        this.productoTarget = producto; // Asignar el producto a la variable
      },
      (error: any) => {
        console.log(error); // Aquí puedes manejar los errores
      }
    );
  }

  aumentarCantidad(): void {
    this.cantProducto++;
  }

  disminuirCantidad(): void {
    if (this.cantProducto > 1) {
      this.cantProducto--;
    }
  }

  agregarProducto(producto: Producto, cantidad:number){
    this.router.navigate(['/carta']);
    this.carritoService.agregarProducto(producto,cantidad)
  }

}
