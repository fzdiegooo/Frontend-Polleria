import { Component, OnInit } from '@angular/core';
import HeaderComponent from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout-inicio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterOutlet],
  templateUrl: './layout-inicio.component.html',
  styleUrl: './layout-inicio.component.css'
})
export default class LayoutInicioComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
