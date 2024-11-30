import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DinamicSidebarComponent } from "../../../../shared/components/dinamic-sidebar/dinamic-sidebar.component";
import ProductosComponent from '../productos.component';
import { CategoriasService } from '../../../../core/services/categorias.service';
import { Categoria } from '../../../../shared/models/Categoria';
import { ProductosService } from '../../../../core/services/productos.service';
import { Producto } from '../../../../shared/models/Producto';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-agregar-producto',
  standalone: true,
  imports: [DinamicSidebarComponent, ReactiveFormsModule],
  templateUrl: './form-agregar-producto.component.html',
  styleUrl: './form-agregar-producto.component.css'
})
export class FormAgregarProductoComponent implements OnInit {
  @Output() productoNuevo = new EventEmitter<Producto>();
  listaCategorias: Categoria[] = [];
  producto: Producto = {} as Producto;
  fb = inject(FormBuilder )
  constructor(private productoComponent:ProductosComponent, private categoriaService: CategoriasService, private productoService: ProductosService) { }

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [0, Validators.required], // Simplificado a un solo campo
    imagen: [null]
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.listaCategorias = categorias;
    })
  }

  //Quiero capturar los datos del formulario y enviarlos al servicio
  agregarProducto() {
    if (this.form.invalid) {
      return;
    }
  
    // Crear un FormData para manejar los datos del producto y la imagen
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('precio', this.form.get('precio')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    formData.append('categoriaId', this.form.get('categoriaId')?.value);
  
    // Verificar si la imagen está en el formulario
    const imagen = this.form.get('imagen')?.value;
    if (imagen) {
      console.log("hay imagen");
      formData.append('imagen', imagen);  // Asegúrate de que 'imagen' se refiera a un archivo
    }
  
    // Enviar la solicitud con FormData
    this.productoService.agregarProducto(formData)
      .subscribe({
        next: (productoGuardado) => {
          this.productoNuevo.emit(productoGuardado);
          this.toggleSidebar();
          Swal.fire('Producto guardado', 'El producto se ha guardado exitosamente', 'success');
          console.log('Producto guardado exitosamente:', productoGuardado);
        },
        error: (error) => {
          console.error('Error al guardar el producto:', error);
        }
      });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.listaCategorias.find(c => c.id == idCategoria);
    return categoria?.nombre ?? '';
  }

  toggleSidebar() {
    this.productoComponent.isCreate = false;
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
}
