import { Component, EventEmitter, inject, Output } from '@angular/core';
import { DinamicSidebarComponent } from "../../../../shared/components/dinamic-sidebar/dinamic-sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../../../shared/models/Categoria';
import CategoriasComponent from '../categorias.component';
import { CategoriasService } from '../../../../core/services/categorias.service';

@Component({
  selector: 'app-form-agregar-categoria',
  standalone: true,
  imports: [DinamicSidebarComponent, ReactiveFormsModule],
  templateUrl: './form-agregar-categoria.component.html',
  styleUrl: './form-agregar-categoria.component.css'
})
export class FormAgregarCategoriaComponent {
  @Output() categoriaNueva = new EventEmitter<Categoria>();
  categoria: Categoria = {} as Categoria;
  fb = inject(FormBuilder)
  constructor(private categoriaComponent:CategoriasComponent, private categoriaService: CategoriasService) { }

  form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    //urlImg: ['', Validators.required],
  });

  ngOnInit(): void {
    
  }

  agregarCategoria() {
    if (this.form.invalid) {
      console.log('Formulario invalido');
      return;
    }
    this.categoriaService.crearCategoria(this.form.value)
      .subscribe({
        next: (categoriaGuardada) => {
          this.categoriaNueva.emit(categoriaGuardada);
          console.log('Categoria guardada exitosamente:', categoriaGuardada);
        },
        error: (error) => {
          console.error('Error al guardar el producto:', error);
        }
      });
  }

  toggleSidebar() {
    this.categoriaComponent.isActive = false;
  }
}
