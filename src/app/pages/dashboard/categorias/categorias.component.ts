import { Component } from '@angular/core';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Categoria } from '../../../shared/models/Categoria';
import { Accion } from '../../../shared/models/Tabla';
import Swal from 'sweetalert2';
import TableActionComponent from "../../../shared/components/table-action/table-action.component";
import { FormAgregarCategoriaComponent } from "./form-agregar-categoria/form-agregar-categoria.component";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [TableActionComponent, FormAgregarCategoriaComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export default class CategoriasComponent {
  title:string = 'Listado de categorias';
  description:string = 'Aqui puedes administrar todas las categorias de los productos';
  columnas:string[]=["nombre","descripcion"]
  categorias: Categoria[] = []
  categoriasFiltradas: Categoria[] = []

  nombreColumnas = {
    'nombre': 'Nombre',
    "descripcion": "Descripción"
  };
  idCategoria: number = 0;
  isActive: boolean = false;

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.categoriasFiltradas = [...this.categorias];
    })
  }

  // Actualiza el array de categorias
  actualizarListaCategoria(categoria: Categoria): void {
    this.categoriasFiltradas.push(categoria);
  }

  onAction(accion: Accion) {
    if (accion.accion == 'verDetalle') {
     this.verDetalle(accion.fila)
   } else if (accion.accion == 'Eliminar') {
     this.eliminar(accion.fila)
   }
  }

  verDetalle(objeto: any) {
    console.log("Detalle"+ objeto.nombre)
  }

  eliminar(objeto:any){
    this.idCategoria = objeto.id
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: "¿Quieres eliminar esta categoria?",
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, entonces llamamos al servicio para eliminar
        this.categoriaService.eliminarCategoria(this.idCategoria).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoría eliminado',
              text: "La categoría ha sido eliminado correctamente",
              confirmButtonText: "Listo"
            });
            // Actualizamos la lista de alumnos en la tabla
            this.categoriasFiltradas = this.categorias.filter(item => item.id !== this.idCategoria);
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

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}
