import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './pages/home/home';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [Home],
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
