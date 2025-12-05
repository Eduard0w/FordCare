import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  storageUsuario: any;
  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
    this.storageUsuario = this.storage.get('usuario');
  }

  verificarConta() {
    if (this.storageUsuario && this.loginForm.valid) {
      if (
        this.storageUsuario.email === this.loginForm.value.email &&
        this.storageUsuario.senha === this.loginForm.value.senha
      ) {
        alert('Login bem-sucedido!');
        console.log('Usuário logado:', this.storageUsuario, ' - ', this.storage.get('usuario'));
        this.router.navigate(['/dashboard']);
        this.storage.set('logado', true);
      } else {
        alert('Email ou senha incorretos.');
        this.storage.set('logado', false);
      }
    }
    console.log(this.loginForm.value);
  }
}
