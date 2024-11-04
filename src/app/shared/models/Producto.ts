import { Categoria } from "./Categoria";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    urlImg: string;
    categoria: Categoria;
    cantidad?: number;
} 