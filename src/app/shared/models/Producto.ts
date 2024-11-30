import { Categoria } from "./Categoria";

export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    urlImg?: string;
    categoria: Categoria;
    cantidad?: number;
    cloudinaryImageId?: string;
} 

export interface ProductoCarrito extends Producto {
    cantidad: number;
}