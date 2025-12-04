import { Component } from '@angular/core';
import { Header } from '../../component/header/header';
import { Footer } from '../../component/footer/footer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(private router: Router){}

  telaLogin(): void{
    this.router.navigate(['/login']);
  }
}
