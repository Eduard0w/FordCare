import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  usuario: any;
  constructor(private router: Router, public storage: LocalStorageService) {
    this.usuario = this.storage.get('usuario');
  }
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
  irParaHome(): void {
    this.router.navigate(['']);
  }

  sair(): void {
    if (this.storage.get('logado')) {
      this.storage.remove('logado');
      this.router.navigate(['/login']);
    }
  }
}
