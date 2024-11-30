import { Component, Input } from '@angular/core';
import { Categoria } from '../../models/Categoria';
import { Router } from '@angular/router';
import { ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() categoria: any = {};
  @Input() nombreCategoria: string = "";
  @Input() imgCategoria: string = "";

  constructor(private router:Router, private producto:ProductosService) { }

  openCategory(categoriaNombre: string) {
    this.producto.goCartWithCategory(categoriaNombre); 
  }
  
}
