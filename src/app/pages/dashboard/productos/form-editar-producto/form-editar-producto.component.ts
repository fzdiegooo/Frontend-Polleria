import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../shared/models/Categoria';
import { Producto } from '../../../../shared/models/Producto';
import ProductosComponent from '../productos.component';
import { CategoriasService } from '../../../../core/services/categorias.service';
import { ProductosService } from '../../../../core/services/productos.service';
import { DinamicSidebarComponent } from "../../../../shared/components/dinamic-sidebar/dinamic-sidebar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-editar-producto',
  standalone: true,
  imports: [DinamicSidebarComponent, ReactiveFormsModule],
  templateUrl: './form-editar-producto.component.html',
  styleUrl: './form-editar-producto.component.css'
})
export class FormEditarProductoComponent implements OnInit {
  listaCategorias: Categoria[] = [];
  form: FormGroup = {} as FormGroup;
  producto: Producto = {} as Producto;
  @Input() productoEditar: Producto = {} as Producto;
  @Output() productoEditado = new EventEmitter<Producto>();
  fb = inject(FormBuilder )
  constructor(private productoComponent:ProductosComponent, private categoriaService: CategoriasService, private productoService: ProductosService) { }

  ngOnInit(): void {
    this.getCategorias();

    this.form = this.fb.group({
      nombre: [this.productoEditar.nombre, Validators.required],
      descripcion: [this.productoEditar.descripcion, Validators.required],
      precio: [this.productoEditar.precio, [Validators.required, Validators.min(0)]],
      categoriaId: [this.productoEditar.categoria.id, Validators.required], // Simplificado a un solo campo
      imagen: [null]
    });
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.listaCategorias = categorias;
    })
  }

  //Quiero capturar los datos del formulario y enviarlos al servicio
  editarProducto() {
    if (this.form.invalid) {
        Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('id', this.productoEditar.id);
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('precio', this.form.get('precio')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('categoriaId', this.form.get('categoriaId')?.value);

    // Verificar si la imagen está en el formulario
    const imagen = this.form.get('imagen')?.value;
    if (imagen) {
      console.log("hay imagen");
      formData.append('imagen', imagen);  // Asegúrate de que 'imagen' se refiera a un archivo
    }else{
      console.log("no hay imagen");
    }

    console.log('Formulario:', this.form.value);
    console.log('FormData:', formData);

    this.productoService.editarProducto(formData)
      .subscribe({
        next: (productoGuardado) => {
          this.productoEditado.emit(productoGuardado);
          this.toggleSidebar();
          Swal.fire('Producto editado', 'El producto se ha editado correctamente', 'success');
          console.log('Producto editado exitosamente:', productoGuardado);
        },
        error: (error) => {
          console.error('Error al editar el producto:', error);
          Swal.fire('Error', 'Hubo un problema al editar el producto. Intenta de nuevo más tarde.', 'error');
        }
      });
  }

  toggleSidebar() {
    this.productoComponent.isEdit = false;
  }

  onFileSelected(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Imagen seleccionada:', file);
      this.form.patchValue({
        imagen: file
      });
    }else{
      console.error('No se ha seleccionado ninguna imagen');
    }
  }

  borrarImagen() {
    this.productoEditar.urlImg = "";
    console.log(this.productoEditar);
    if (this.productoEditar.cloudinaryImageId) {
      
      this.productoService.eliminarImagenProducto(this.productoEditar.cloudinaryImageId).subscribe({
        next: (response) => {
          console.log('Imagen eliminada correctamente:', response);
          Swal.fire('Imagen eliminada', 'La imagen se ha eliminado correctamente', 'success');
        },
        error: (error) => {
          console.error('Error al eliminar imagen:', error);
          Swal.fire('Error al eliminar imagen', 'La imagen no se ha eliminado', 'error');
        }
      });
    }else{
      Swal.fire('Error al eliminar imagen', 'La imagen no se ha eliminado', 'error');
    }
  }
}
