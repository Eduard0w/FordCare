import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from "../../component/header/header";

// interface Vehicle {
//   brand: string;
//   model: string;
//   year: number | null;
//   plate?: string;
//   fuel: string;
//   mileage: number | null;
//   lastOilChangeDate?: string | null;
//   lastOilChangeKm?: number | null;
//   lastAirFilterChangeDate?: string | null;
//   lastAirFilterChangeKm?: number | null;
//   lastBrakeChangeDate?: string | null;
//   lastBrakeChangeKm?: number | null;
//   lastTireChangeDate?: string | null;
//   lastTireChangeKm?: number | null;
//   usageType?: string;
//   avgKmPerDay?: number | null;
// adicione outros campos que julgar necessários
// }

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
  // vehicleForm: FormGroup;
  activeTab = 0;
  // classes para tabs (puro tailwind classes em string para simplificar)
  activeTabClass = 'px-4 py-2 -mb-px border-b-2 border-blue-600 text-blue-700 font-semibold';
  inactiveTabClass = 'px-4 py-2 text-gray-600 hover:text-blue-700';
  // constructor(private fb: FormBuilder) {
  //   // inicializar o formulário AQUI, após injetar fb
  //   this.vehicleForm = this.fb.group({
  //     brand: ['', Validators.required],
  //     model: ['', Validators.required],
  //     year: [null, Validators.required],
  //     plate: [''],
  //     fuel: ['', Validators.required],
  //     mileage: [null, Validators.required],
  //     lastOilChangeDate: [null],
  //     lastOilChangeKm: [null],
  //     lastAirFilterChangeDate: [null],
  //     lastAirFilterChangeKm: [null],
  //     lastBrakeChangeDate: [null],
  //     lastBrakeChangeKm: [null],
  //     lastTireChangeDate: [null],
  //     lastTireChangeKm: [null],
  //     // alertas
  //     engineLight: [false],
  //     absLight: [false],
  //     batteryLight: [false],
  //     oilPressureLight: [false],
  //     tempLight: [false],
  //     usageType: [''],
  //     avgKmPerDay: [null],
  //   });
  // }
  setTab(i: number) {
    this.activeTab = i;
  }
  // onReset() {
  // this.vehicleForm.reset();
  // se quiser manter marca/combustível como 'Ford' por padrão, setar aqui
  // this.vehicleForm.patchValue({ brand: 'Ford' });
  // }
  // private mapFormToVehicle(): Vehicle {
  //   const f = this.vehicleForm.value;
  //   // normaliza e garante tipos corretos
  //   const vehicle: Vehicle = {
  //     brand: (f.brand ?? '').toString(),
  //     model: (f.model ?? '').toString(),
  //     year: f.year !== null && f.year !== undefined ? Number(f.year) : null,
  //     plate: f.plate ?? undefined,
  //     fuel: (f.fuel ?? '').toString(),
  //     mileage: f.mileage !== null && f.mileage !== undefined ? Number(f.mileage) : null,
  //     lastOilChangeDate: f.lastOilChangeDate ?? null,
  //     lastOilChangeKm:
  //       f.lastOilChangeKm !== null && f.lastOilChangeKm !== undefined
  //         ? Number(f.lastOilChangeKm)
  //         : null,
  //     lastAirFilterChangeDate: f.lastAirFilterChangeDate ?? null,
  //     lastAirFilterChangeKm:
  //       f.lastAirFilterChangeKm !== null && f.lastAirFilterChangeKm !== undefined
  //         ? Number(f.lastAirFilterChangeKm)
  //         : null,
  //     lastBrakeChangeDate: f.lastBrakeChangeDate ?? null,
  //     lastBrakeChangeKm:
  //       f.lastBrakeChangeKm !== null && f.lastBrakeChangeKm !== undefined
  //         ? Number(f.lastBrakeChangeKm)
  //         : null,
  //     lastTireChangeDate: f.lastTireChangeDate ?? null,
  //     lastTireChangeKm:
  //       f.lastTireChangeKm !== null && f.lastTireChangeKm !== undefined
  //         ? Number(f.lastTireChangeKm)
  //         : null,
  //     usageType: f.usageType ?? undefined,
  //     avgKmPerDay:
  //       f.avgKmPerDay !== null && f.avgKmPerDay !== undefined ? Number(f.avgKmPerDay) : null,
  //   };
  //   return vehicle;
  // }
  // onSubmit() {
  //   if (this.vehicleForm.invalid) {
  //     // opcional: navegar para a aba com erro
  //     // encontrar primeiro controle inválido e setTab conforme necessário
  //     alert('Preencha os campos obrigatórios antes de salvar.');
  //     return;
  //   }
  // const vehicle = this.mapFormToVehicle();
  // // agora vehicle está tipado corretamente como Vehicle
  // console.log('Vehicle (normalized):', vehicle);
  // // exemplo: salvar no localStorage (provisório)
  // localStorage.setItem('fordcare_vehicle', JSON.stringify(vehicle));
  // alert('Veículo salvo com sucesso!');
  // }
}
