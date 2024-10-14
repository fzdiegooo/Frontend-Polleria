import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-pantalla-inicio',
  standalone: true,
  imports: [],
  templateUrl: './pantalla-inicio.component.html',
  styleUrl: './pantalla-inicio.component.css'
})
export default class PantallaInicioComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
}
