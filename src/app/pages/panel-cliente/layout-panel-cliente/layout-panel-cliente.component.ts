import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout-panel-cliente',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-panel-cliente.component.html',
  styleUrl: './layout-panel-cliente.component.css'
})
export default class LayoutPanelClienteComponent {
  constructor(private authService: AuthService){}
  cerrarSesion(){
    this.authService.logout();
  }
}
