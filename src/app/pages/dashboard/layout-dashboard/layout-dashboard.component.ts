import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarDashboardComponent } from "./sidebar-dashboard/sidebar-dashboard.component";

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarDashboardComponent],
  templateUrl: './layout-dashboard.component.html',
  styleUrl: './layout-dashboard.component.css'
})
export default class LayoutDashboardComponent {

}
