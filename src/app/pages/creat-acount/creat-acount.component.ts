import {
  FormBuilder,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-creat-acount',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgIf],
  templateUrl: './creat-acount.component.html',
  styleUrl: './creat-acount.component.css',
})
export class CreatAcountComponent {
  creatAcountForm!: FormGroup;
  constructor(
    private storage: LocalStorageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.creatAcountForm = this.fb.group({
      nome: [''],
      email: [''],
      senha: [''],
      confirmSenha: [''],
      LGPD: [false, Validators.requiredTrue],
    });
  }

  criarConta() {
    if (this.creatAcountForm.invalid) {
      this.creatAcountForm.markAllAsTouched();
      alert('você precisa concordar com os termos...');
      return;
    }
    console.log(this.creatAcountForm.value);
    // this.storage.set('usuario', this.creatAcountForm.value);
    this.router.navigate(['/login']);
  }
}
