import { Component } from '@angular/core';
import { Header } from "../../component/header/header";
import { AppComponent } from "../../component/card-diagnostico/card-diagnostico.component";

@Component({
  selector: 'app-dashboard',
  imports: [Header, AppComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
