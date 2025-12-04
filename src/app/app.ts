import * as AOS from 'aos'; // Import AOS
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ngOnInit(): void {
    try {
      AOS.init({
        duration: 2000, // Duração da animação em milissegundos (1s)
        once: true, // Se 'true', anima só na primeira vez que desce a tela
      });
    } catch (error) {
      console.log(error);
    }
  }
  protected readonly title = signal('FordCare');
}
