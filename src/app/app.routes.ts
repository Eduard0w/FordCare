import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreatAcountComponent } from './pages/creat-acount/creat-acount.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreatVehicleComponent } from './pages/creat-vehicle/creat-vehicle.component';
import { VeiculosComponent } from './pages/veiculos/veiculos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota coringa para URLs não encontradas
  { path: 'login', component: LoginComponent },
  { path: 'creatAcount', component: CreatAcountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicle', component: VeiculosComponent },
  { path: 'vehicle/create', component: CreatVehicleComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
