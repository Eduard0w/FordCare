import { Component, OnInit } from '@angular/core';
import { Header } from '../../component/header/header';
import { AppComponent } from '../../component/card-diagnostico/card-diagnostico.component';
import { VeiculoCadastrado } from '../../models/veiculo-cadastrado';
import { CarService } from '../../services/car.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, Header, AppComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  acoes: proximasAcoes = new proximasAcoes();
  veiculo: VeiculoCadastrado | null = null;
  saude = 0;
  textoSaude = '';
  kmInput: number | null = null;
  recomendacoes: { tipo: string; titulo: string; detalhe?: string }[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.veiculo = this.carService.getVeiculo();
    if (this.veiculo) {
      this.atualizaTodos();
    }
  }

  private atualizaTodos() {
    if (!this.veiculo) return;
    this.saude = this.carService.calculaSaude(this.veiculo);
    this.textoSaude = this.getTextoSaude(this.saude);
    this.recomendacoes = this.carService.geraRecomendacoes(this.veiculo);
  }

  private getTextoSaude(valor: number) {
    if (valor > 80) return 'Seu veículo está saudável';
    if (valor > 50) return 'Atenção, revisão se aproxima';
    return 'Seu veículo precisa de atenção!';
  }

  atualizarKm() {
    if (this.kmInput == null || !this.veiculo) return;
    if (this.kmInput < this.veiculo.quilometragem) {
      // evitamos regressão de km
      alert('A quilometragem informada é menor que a atual. Verifique.');
      return;
    }
    this.veiculo = this.carService.updateQuilometragem(this.kmInput);
    this.kmInput = null;
    this.atualizaTodos();
  }

  formatDate(d?: Date) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString();
  }
}

class proximasAcoes {
  recomendacoes = [
    {
      titulo: 'Troca de óleo',
      detalhe: 'em 350 km',
      tipo: 'danger',
      icon: 'lucide-wrench',
    },
    {
      titulo: 'Rodízio de pneus recomendado',
      detalhe: 'em 1.200 km',
      tipo: 'warning',
      icon: 'lucide-circle-dot',
    },
    {
      titulo: 'Revisão geral prevista',
      detalhe: 'para Março 2025',
      tipo: 'good',
      icon: 'lucide-settings',
    },
    {
      titulo: 'Verificar bateria',
      detalhe: 'última troca há 2 anos',
      tipo: 'warning',
      icon: 'lucide-battery',
    },
    {
      titulo: 'Luz de injeção registrada',
      detalhe: 'veja possíveis causas',
      tipo: 'danger',
      icon: 'lucide-triangle-alert',
    },
  ];

  getDelay(i: number) {
    return `${i * 50}ms`;
  }
}
