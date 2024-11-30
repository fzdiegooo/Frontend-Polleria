import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto, ProductoCarrito } from '../../shared/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly STORAGE_KEY = 'cartProducts';
  
  private cantidadProductos = new BehaviorSubject<number>(0);
  cantidadProductos$ = this.cantidadProductos.asObservable();
  
  private cartSubject = new BehaviorSubject<ProductoCarrito[]>([]);
  carrito$ = this.cartSubject.asObservable();

  private totalCarrito = new BehaviorSubject<number>(0);
  totalCarrito$ = this.totalCarrito.asObservable();

  constructor() {
    this.initializeCart();
  }

  private initializeCart(): void {
    const productos = this.getStorageProducts();
    this.cartSubject.next(productos);
    this.updateCartQuantity(productos);
    this.updateCartTotal(productos);
  }

  private getStorageProducts(): ProductoCarrito[] {
    try {
      const storage = localStorage.getItem(this.STORAGE_KEY);
      return storage ? JSON.parse(storage) : [];
    } catch (error) {
      console.error('Error al obtener productos del localStorage:', error);
      return [];
    }
  }

  private saveToStorage(productos: ProductoCarrito[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productos));
      this.cartSubject.next(productos);
      this.updateCartQuantity(productos);
      this.updateCartTotal(productos);
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  private updateCartQuantity(productos: ProductoCarrito[]): void {
    const cantidad = productos.reduce((total, prod) => total + prod.cantidad, 0);
    this.cantidadProductos.next(cantidad);
  }

  private updateCartTotal(productos: ProductoCarrito[]): void {
    const total = productos.reduce((sum, prod) => sum + (prod.precio * prod.cantidad), 0);
    this.totalCarrito.next(total);
  }

  agregarProducto(producto: Producto, cantidad: number = 1): void {
    const productos = this.getStorageProducts();
    const productoExistente = productos.find(p => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      productos.push(this.createCartProduct(producto, cantidad));
    }

    this.saveToStorage(productos);
  }

  quitarProducto(producto: Producto): void {
    const productos = this.getStorageProducts();
    const index = productos.findIndex(p => p.id === producto.id);
    
    if (index !== -1) {
      if (productos[index].cantidad === 1) {
        productos.splice(index, 1);
      } else {
        productos[index].cantidad--;
      }
      this.saveToStorage(productos);
    }
  }

  eliminarProducto(producto: Producto): void {
    const productos = this.getStorageProducts();
    const filteredProducts = productos.filter(p => p.id !== producto.id);
    this.saveToStorage(filteredProducts);
  }

  private createCartProduct(producto: Producto, cantidad: number): ProductoCarrito {
    return {
      ...producto,
      cantidad
    };
  }

  limpiarCarrito(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      this.cartSubject.next([]);
      this.cantidadProductos.next(0);
      this.totalCarrito.next(0);
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
    }
  }
}




