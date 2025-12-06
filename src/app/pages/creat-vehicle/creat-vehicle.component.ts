import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../../component/header/header';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { VeiculoCadastrado } from '../../models/veiculo-cadastrado';

@Component({
  selector: 'app-creat-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './creat-vehicle.component.html',
  styles: [
    `
      /* Caso queira pequenas customizações além do Tailwind */
    `,
  ],
})
export class CreatVehicleComponent {
  vehicleForm: FormGroup;
  activeTab = 0;
  // classes para tabs (puro tailwind classes em string para simplificar)
  activeTabClass = 'px-4 py-2 -mb-px border-b-2 border-blue-600 text-blue-700 font-semibold';
  inactiveTabClass = 'px-4 py-2 text-gray-600 hover:text-blue-700';
  constructor(private fb: FormBuilder, private carService: CarService, private router: Router) {
    // inicializar o formulário AQUI, após injetar fb
    this.vehicleForm = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      ano: [null, Validators.required],
      placa: [''],
      combustivel: ['', Validators.required],
      quilometragem: [null, Validators.required],

      ult_troca_oleo_data: [''],
      ult_troca_oleo_km: [''],

      ult_troca_filtro_data: [''],
      ult_troca_filtro_km: [''],

      ult_troca_pastilhas_data: [''],
      ult_troca_pastilhas_km: [''],

      // alertas
      engineLight: [false],
      absLight: [false],
      batteryLight: [false],
      airbagLight: [false],
      oilLight: [false],
      tempLight: [false],

      tipo_uso: [''],
      KM_medio_p_dia: [''],
    });

    // Se já existe carro no storage → preencher o form
    const saved = this.carService.getVeiculo();
    if (saved) {
      this.populateForm(saved);
    }
  }

  setTab(i: number) {
    this.activeTab = i;
  }

  populateForm(v: VeiculoCadastrado) {
    this.vehicleForm.patchValue({
      marca: v.marca,
      modelo: v.modelo,
      ano: v.ano,
      placa: v.placa,
      combustivel: v.combustivel,
      quilometragem: v.quilometragem,

      ult_troca_oleo_data: v.ult_troca_oleo[0]?.toISOString().substring(0, 10),
      ult_troca_oleo_km: v.ult_troca_oleo[1],

      ult_troca_filtro_data: v.ult_troca_filtro[0]?.toISOString().substring(0, 10),
      ult_troca_filtro_km: v.ult_troca_filtro[1],

      ult_troca_pastilhas_data: v.ult_troca_pastilhas[0]?.toISOString().substring(0, 10),
      ult_troca_pastilhas_km: v.ult_troca_pastilhas[1],

      engineLight: v.alerta_painel.includes('motor'),
      absLight: v.alerta_painel.includes('abs'),
      batteryLight: v.alerta_painel.includes('bateria'),
      airbagLight: v.alerta_painel.includes('airbag'),
      oilLight: v.alerta_painel.includes('oleo'),

      tipo_uso: v.tipo_uso,
      KM_medio_p_dia: v.KM_medio_p_dia,
    });
  }

  salvar() {
    const f = this.vehicleForm.value;

    // CONVERTE PARA O MODELO DO CarService
    const veiculo: VeiculoCadastrado = {
      id: crypto.randomUUID(),
      marca: f.marca,
      modelo: f.modelo,
      ano: +f.ano,
      placa: f.placa,
      combustivel: f.combustivel,

      quilometragem: +f.quilometragem,

      ult_troca_oleo: [new Date(f.ult_troca_oleo_data), +f.ult_troca_oleo_km],

      ult_troca_filtro: [new Date(f.ult_troca_filtro_data), +f.ult_troca_filtro_km],

      ult_troca_pastilhas: [new Date(f.ult_troca_pastilhas_data), +f.ult_troca_pastilhas_km],

      alerta_painel: [
        f.engineLight ? 'motor' : null,
        f.absLight ? 'abs' : null,
        f.batteryLight ? 'bateria' : null,
        f.airbagLight ? 'airbag' : null,
        f.oilLight ? 'oleo' : null,
      ].filter((a) => a !== null),

      tipo_uso: f.tipo_uso,
      KM_medio_p_dia: +f.KM_medio_p_dia || 0,
    };

    this.carService.saveVeiculo(veiculo);
    console.log(veiculo);
    this.router.navigate(['/dashboard']);
  }
}
