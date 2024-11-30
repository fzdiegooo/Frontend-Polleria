import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import CantidadProductosComponent from "./cantidad-productos/cantidad-productos.component";
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CantidadProductosComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export default class HeaderComponent implements OnInit {
  rolUser: string = '';
  @Output() toggleCarrito = new EventEmitter<void>();
  toggle(){
    this.toggleCarrito.emit();
  }

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.rolUser = user?.role ?? '';
    })
  }

}
