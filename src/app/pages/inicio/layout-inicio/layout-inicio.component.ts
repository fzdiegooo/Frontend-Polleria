import { Component, OnInit } from '@angular/core';
import HeaderComponent from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import CarritoComponent from "../carrito/carrito.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-inicio',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, CarritoComponent, CommonModule],
  templateUrl: './layout-inicio.component.html',
  styleUrl: './layout-inicio.component.css'
})
export default class LayoutInicioComponent implements OnInit {
  isClose:boolean = false

  ngOnInit(): void {
    initFlowbite();
  }

  toggleCarrito(){
    this.isClose = !this.isClose;
  }
  
}
