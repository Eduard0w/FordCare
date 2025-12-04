export interface VeiculoCadastrado {
  marca: string;
  modelo: string;
  ano: number;
  placa?: string;
  combustivel: string;
  quilometragem: number;
  // Data da ultima troca + KM da ultima troca
  ult_troca_oleo: [Date, number];
  ult_troca_filtro: [Date, number];
  ult_troca_pastilhas: [Date, number];
  alerta_painel: string[];
  tipo_uso: string;
  KM_medio_p_dia: number;
}
