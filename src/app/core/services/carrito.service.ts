import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../shared/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cantidadProductos = new BehaviorSubject<number>(0);
  cantidadProductos$ = this.cantidadProductos.asObservable();

  constructor() {
    this.obtenerCantidadDesdeLocalStorage();
  }

  agregarProducto(producto:Producto) {
    const memoria = localStorage.getItem('cartProducts');
    if(!memoria) {
      let nuevoProducto = this.getNuevoProductoCarrito(producto);
      this.agregarCantProducto(1);
      localStorage.setItem('cartProducts', JSON.stringify([nuevoProducto]));
    }else{
      const indiceProducto = JSON.parse(memoria).findIndex((p:Producto) => p.id === producto.id);
      const copiaMemoria = JSON.parse(memoria);
      if(indiceProducto === -1) {
        let nuevoProducto = this.getNuevoProductoCarrito(producto);
        copiaMemoria.push(nuevoProducto);
        this.agregarCantProducto(1);
      }else{
        copiaMemoria[indiceProducto].cantidad++;
        this.agregarCantProducto(1);
      }
      localStorage.setItem('cartProducts', JSON.stringify(copiaMemoria));
    }
  }

  getNuevoProductoCarrito(producto:Producto) {
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
  }

  private obtenerCantidadDesdeLocalStorage() {
    const memoria = localStorage.getItem('cartProducts');
    if (memoria) {
      const memoriaParseada = JSON.parse(memoria);
      let cantidadTotal = 0;
      memoriaParseada.forEach((producto: { cantidad: number }) => {
        cantidadTotal += producto.cantidad;
      });
      this.cantidadProductos.next(cantidadTotal); // Establece la cantidad inicial
    }
  }

  agregarCantProducto(cantidad: number) {
    const nuevaCantidad = this.cantidadProductos.value + cantidad;
    this.cantidadProductos.next(nuevaCantidad);
  }

  eliminarCantProducto(cantidad: number) {
    const nuevaCantidad = Math.max(this.cantidadProductos.value - cantidad, 0);
    this.cantidadProductos.next(nuevaCantidad);
  }

  obtenerProductos():any{
    const memoria = localStorage.getItem("cartProducts")
    if(!memoria){
      console.log("carrito vacio");
      return;
    }

    try {
      const nuevaMemoria = JSON.parse(memoria)
      return nuevaMemoria;
    } catch (error) {
      console.log(error);
    }
  }



}
