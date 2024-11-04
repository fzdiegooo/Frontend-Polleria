import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import CantidadProductosComponent from "./cantidad-productos/cantidad-productos.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CantidadProductosComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent {

  @Output() toggleCarrito = new EventEmitter<void>();
  toggle(){
    this.toggleCarrito.emit();
  }

  constructor(){}



}
