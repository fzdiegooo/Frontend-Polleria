import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css'
})
export class SidebarDashboardComponent {
  constructor(private authService: AuthService, private router: Router) { }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}
