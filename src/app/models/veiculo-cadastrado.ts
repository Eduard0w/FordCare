import { Data } from '@angular/router';

export interface VeiculoCadastrado {
  marca: string;
  modelo: string;
  ano: number;
  placa?: string;
  combustivel: string;
  quilometragem: number;
  // Data da ultima troca + KM da ultima troca
  ult_troca_oleo: [Data, number];
  ult_troca_filtro: [Data, number];
  ult_troca_pastilhas: [Data, number];
  alerta_painel: string[];
  tipo_uso: string;
  KM_medio_p_dia: number;
}
