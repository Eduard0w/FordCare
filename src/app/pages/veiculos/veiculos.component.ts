import { VeiculoCadastrado } from './../../models/veiculo-cadastrado';
import { Component } from '@angular/core';
import { Header } from '../../component/header/header';
import { Router } from '@angular/router';
import { NgIf, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-veiculos',
  imports: [Header, NgIf, FormsModule, NgForOf],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css',
})
export class VeiculosComponent {
  VeiculoCadastrados: VeiculoCadastrado[] = [];
  existemVeiculos: boolean = true;
  telaRemoverVeiculo: boolean = false;

  constructor(private router: Router, private car: CarService) {
    const veiculo = this.car.getVeiculo();
    if (veiculo) {
      this.VeiculoCadastrados.push(veiculo);
    }
  }

  telaCriar() {
    this.router.navigate(['/vehicle/create']);
    this.existemVeiculos = true;
  }

  aparecerTelaRemover() {
    if (this.existemVeiculos) {
      this.telaRemoverVeiculo = true;
    } else {
      this.telaRemoverVeiculo = false;
    }
  }

  removerVeiculo() {
    // Lógica para remover o veículo
    // this.VeiculoCadastrados = this.VeiculoCadastrados.filter(veiculo => veiculo.id !== id);
    this.existemVeiculos = this.VeiculoCadastrados.length > 0;
    this.telaRemoverVeiculo = false;
  }

  irParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  irParaCreateService(veiculo: VeiculoCadastrado) {
    this.router.navigate(['/vehicle/create']);
  }
}
