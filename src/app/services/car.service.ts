import { Injectable } from '@angular/core';
import { VeiculoCadastrado } from '../models/veiculo-cadastrado';

const STORAGE_KEY = 'veiculo_cadastrado_v1';

@Injectable({ providedIn: 'root' })
export class CarService {
  saveVeiculo(v: VeiculoCadastrado) {
    // serializa Date para ISO para persistir
    const serial = {
      ...v,
      ult_troca_oleo: [v.ult_troca_oleo[0].toISOString(), v.ult_troca_oleo[1]],
      ult_troca_filtro: [v.ult_troca_filtro[0].toISOString(), v.ult_troca_filtro[1]],
      ult_troca_pastilhas: [v.ult_troca_pastilhas[0].toISOString(), v.ult_troca_pastilhas[1]],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serial));
  }

  getVeiculo(): VeiculoCadastrado | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const obj = JSON.parse(raw);
      // desserializa strings para Date
      return {
        ...obj,
        ult_troca_oleo: [new Date(obj.ult_troca_oleo[0]), obj.ult_troca_oleo[1]],
        ult_troca_filtro: [new Date(obj.ult_troca_filtro[0]), obj.ult_troca_filtro[1]],
        ult_troca_pastilhas: [new Date(obj.ult_troca_pastilhas[0]), obj.ult_troca_pastilhas[1]],
      } as VeiculoCadastrado;
    } catch (e) {
      console.error('Erro ao parsear veiculo do localStorage', e);
      return null;
    }
  }

  // setVeiculo(v: VeiculoCadastrado) {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  //   this.saveVeiculo(v);
  // }

  updateQuilometragem(novaKm: number) {
    const v = this.getVeiculo();
    if (!v) return null;
    v.quilometragem = novaKm;
    this.saveVeiculo(v);
    return v;
  }

  // calcula "saúde" como valor 0..100
  // regra simples:
  // - com base em ultima troca de óleo: quanto km rodados desde a última troca
  // - junta com média diaria para estimar se está próximo do limite
  calculaSaude(v: VeiculoCadastrado): number {
    let proporcaoKm: number;
    if (!v) return 0;

    // 1️⃣ KM desde a última troca
    const kmDesdeUltTroca = v.quilometragem - v.ult_troca_oleo[1];
    const limiteKm = 10000;
    if (kmDesdeUltTroca === v.quilometragem) {
      // Quero calcular com base na data apenas, se a data for muito antiga ele calcula sem precisar da km
      const ultimaTrocaOleo: Date = v.ult_troca_oleo[0];
      const ultimaTrocaFiltro: Date = v.ult_troca_filtro[0];
      const ultimaTrocaPastilhas: Date = v.ult_troca_pastilhas[0];
      const maisRecente = new Date(
        Math.max(
          ultimaTrocaOleo.getTime(),
          ultimaTrocaFiltro.getTime(),
          ultimaTrocaPastilhas.getTime()
        )
      );
      const hoje = new Date();
      const diffMs = hoje.getTime() - maisRecente.getTime(); // ms desde a última troca
      const diffDias = diffMs / (1000 * 60 * 60 * 24); // dias desde a última troca
      const kmEstimadoDesdeUltTroca = diffDias * v.KM_medio_p_dia;
      proporcaoKm = Math.max(0, Math.min(1, 1 - kmEstimadoDesdeUltTroca / limiteKm)); // 0..1
    } else {
      proporcaoKm = Math.max(0, Math.min(1, 1 - kmDesdeUltTroca / limiteKm)); // 0..1
    }
    // 2️⃣ Dias desde a última troca
    const dias = this.getDiasDesde(v.ult_troca_oleo[0]);
    const limiteDias = 180; // 6 meses
    const proporcaoDias = Math.max(0, Math.min(1, 1 - dias / limiteDias));

    // 3️⃣ Alertas no painel
    const qtdAlertas = v.alerta_painel?.length ?? 0;
    const maxAlertasImpacto = 5; // depois disso o impacto estabiliza
    const proporcaoAlertas = Math.max(0, Math.min(1, 1 - qtdAlertas / maxAlertasImpacto));

    // 4️⃣ Combinação ponderada
    const pesoKm = 0.3;
    const pesoDias = 0.45;
    const pesoAlertas = 0.25;

    const resultado =
      proporcaoKm * pesoKm + proporcaoDias * pesoDias + proporcaoAlertas * pesoAlertas;

    return Math.round(resultado * 100);
  }

  // sugestões básicas a partir da saúde e alertas
  geraRecomendacoes(v: VeiculoCadastrado) {
    const recs: { tipo: 'good' | 'warning' | 'danger'; titulo: string; detalhe?: string }[] = [];
    const saude = this.calculaSaude(v);

    if (v.alerta_painel && v.alerta_painel.length) {
      v.alerta_painel.forEach((a) => {
        recs.push({
          tipo: 'danger',
          titulo: `Alerta: ${a}`,
          detalhe: 'Verifique em certificado/meio técnico.',
        });
      });
    }

    if (saude >= 80) {
      recs.push({
        tipo: 'good',
        titulo: 'Veículo saudável',
        detalhe: 'Sem ações imediatas necessárias',
      });
    } else if (saude >= 50) {
      recs.push({ tipo: 'warning', titulo: 'Atenção', detalhe: 'Revisão recomendada em breve' });
      recs.push({
        tipo: 'good',
        titulo: 'Cheque óleo e filtros',
        detalhe: 'Verificar componentes principais',
      });
    } else {
      recs.push({
        tipo: 'danger',
        titulo: 'Urgente: revisão necessária',
        detalhe: 'Agendar oficina',
      });
    }

    // próxima troca de óleo estimada
    const proximaTrocaKm = v.ult_troca_oleo[1] + 10000;
    const falta = proximaTrocaKm - v.quilometragem;
    recs.push({
      tipo: falta <= 1000 ? 'warning' : 'good',
      titulo: 'Troca de óleo',
      detalhe: `Em ${falta} km (${proximaTrocaKm} km)`,
    });

    return recs;
  }

  getDiasDesde(data: Date | undefined): number {
    if (!data) return 0;

    const dataTroca = new Date(data);
    const hoje = new Date();

    const diffMs = hoje.getTime() - dataTroca.getTime();
    const diffDias = diffMs / (1000 * 60 * 60 * 24);

    return Math.floor(diffDias);
  }
}
