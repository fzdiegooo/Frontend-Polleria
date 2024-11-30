import { Producto } from "./Producto";

export interface DetallePedido {
    id?: string;
    precioNeto: number;
    cantidad: number;
    producto: Producto;
}
  
export interface Pedido {
    id?: string;
    fecha: string;
    usuario: {
      id: string;
    };
    estadoPedido: {
      id: number;
    };
    tipoEntrega: {
      id: number;
    };
    detallePedidos: DetallePedido[];
}