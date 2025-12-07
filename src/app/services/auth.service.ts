import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const logado = localStorage.getItem('logado');
    return logado === 'true';
  }
}
