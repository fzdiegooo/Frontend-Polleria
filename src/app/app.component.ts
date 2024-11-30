import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend-polleria';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    initFlowbite();
    this.primengConfig.ripple = true;
  }
}
