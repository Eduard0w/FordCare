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
    if (!v) return 0;
    const kmDesdeUltTroca = v.quilometragem - v.ult_troca_oleo[1];
    // exemplo de limite: trocar óleo a cada 10.000 km (padrão simplificado)
    const limite = 10000;
    const proporcao = Math.max(0, Math.min(1, 1 - kmDesdeUltTroca / limite)); // 1 -> saudável
    // impacto de tempo: se média diária alta, reduzir saúde um pouco
    const usoFactor = Math.max(0.8, Math.min(1.0, 1 - v.KM_medio_p_dia / 200)); // se usa >200km/dia reduz
    const saude = Math.round(proporcao * 100 * usoFactor);
    return saude;
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
}
