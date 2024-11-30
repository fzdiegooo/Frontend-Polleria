import { Component, OnInit } from '@angular/core';
import TableActionComponent from "../../../shared/components/table-action/table-action.component";
import { Producto } from '../../../shared/models/Producto';
import { Accion } from '../../../shared/models/Tabla';
import { ProductosService } from '../../../core/services/productos.service';
import { SidebarDashboardComponent } from "../layout-dashboard/sidebar-dashboard/sidebar-dashboard.component";
import { DinamicSidebarComponent } from "../../../shared/components/dinamic-sidebar/dinamic-sidebar.component";
import { FormAgregarProductoComponent } from "./form-agregar-producto/form-agregar-producto.component";
import Swal from 'sweetalert2';
import { FormEditarProductoComponent } from "./form-editar-producto/form-editar-producto.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [TableActionComponent, SidebarDashboardComponent, DinamicSidebarComponent, FormAgregarProductoComponent, FormEditarProductoComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent implements OnInit {
  title:string = 'Listado de productos';
  description:string = 'Aqui puedes administrar todos los productos del restaurante';
  columnas:string[]=["nombre","descripcion","precio","categoria.nombre"]
  productos: Producto[] = []
  productosFiltrados: Producto[] = []
  productoEditar: Producto = {} as Producto; //Variable que se manda para editar

  filtroNombre: string = '';
  filtroGrado: string = '';
  filtroSeccion: string = '';
  nombreColumnas = {
    'nombre': 'Nombre',
    'descripcion': 'Descripción',
    'precio':'Precio',
    'categoria.nombre': 'Categoria',
  };
  idProducto: string ="";
  isCreate: boolean = false;
  isEdit: boolean = false;

  constructor(private productoService: ProductosService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = [...this.productos];
    })
  }

  actualizarListaProducto(producto: Producto): void {
    this.productosFiltrados.push(producto);
  }

  actualizarProducto(producto: Producto): void {
    // Actualiza el producto en la lista
    const index = this.productosFiltrados.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productosFiltrados[index] = producto; // Actualiza el producto en el arreglo
    }
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Editar') {
     this.editar(accion.fila)
   } else if (accion.accion == 'Eliminar') {
     this.eliminar(accion.fila)
   }
  }

  editar(objeto: any) {
    this.productoEditar = objeto;
    this.toggleEditSidebar();
    console.log("Detalle"+ objeto.id)
  }

  eliminar(objeto:any){
    this.idProducto = objeto.id
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar este producto?",
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, entonces llamamos al servicio para eliminar
        this.productoService.eliminarProducto(this.idProducto).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              text: "El producto ha sido eliminado correctamente",
              confirmButtonText: "Listo"
            });
            // Actualizamos la lista de alumnos en la tabla
            this.productosFiltrados = this.productos.filter(item => item.id !== this.idProducto);
          },
          (error: { error: { message: string } }) => {
            Swal.fire({
              icon: 'error',
              title: error.error.message,
              confirmButtonText: "Aceptar"
            });
          }
        );
      }
    });
    console.log("eliminar",objeto)
  }

  toggleCreateSidebar() {
    this.isCreate = !this.isCreate;
  }

  toggleEditSidebar() {
    this.isEdit = !this.isEdit;
  }

}
