import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Definição dos ícones SVG
const ICONS: Record<string, string> = {
  stethoscope: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3 0"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  vibrate: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 8 2 2-2 2 2 2-2 2"/><path d="m22 8-2 2 2 2-2 2 2 2"/><rect width="8" height="14" x="8" y="5" rx="1"/></svg>`,
  fuel: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>`,
  volume2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  power: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/></svg>`,
  cloudFog: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 17H7"/><path d="M17 21H9"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
};

interface Symptom {
  id: string;
  iconKey: string;
  label: string;
  causes: string[];
  recommendations: string[];
}

@Component({
  selector: 'app-card-diagnostico',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './card-diagnostico.component.html', // Aponta para o arquivo HTML separado
  styles: [
    `
      @keyframes scale-in {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-scale-in {
        animation: scale-in 0.3s ease-out forwards;
        opacity: 0;
      }
    `,
  ],
})
export class AppComponent {
  private sanitizer = inject(DomSanitizer);

  selectedSymptom = signal<Symptom | null>(null);

  symptoms: Symptom[] = [
    {
      id: '1',
      iconKey: 'vibrate',
      label: 'Vibrações',
      causes: [
        'Pneus desbalanceados ou desgastados',
        'Problemas na suspensão',
        'Discos de freio empenados',
        'Rolamentos danificados',
      ],
      recommendations: [
        'Verificar balanceamento dos pneus',
        'Inspecionar componentes da suspensão',
        'Checar estado dos freios',
      ],
    },
    {
      id: '2',
      iconKey: 'fuel',
      label: 'Consumo alto',
      causes: [
        'Filtro de ar sujo',
        'Velas de ignição desgastadas',
        'Sensor de oxigênio com defeito',
        'Pneus com pressão baixa',
      ],
      recommendations: [
        'Trocar filtro de ar',
        'Verificar velas de ignição',
        'Calibrar pneus regularmente',
      ],
    },
    {
      id: '3',
      iconKey: 'volume2',
      label: 'Barulho na direção',
      causes: [
        'Baixo nível de fluido da direção',
        'Bomba da direção hidráulica com problema',
        'Juntas homocinéticas desgastadas',
        'Terminais de direção soltos',
      ],
      recommendations: [
        'Verificar nível do fluido',
        'Inspecionar sistema de direção',
        'Agendar revisão especializada',
      ],
    },
    {
      id: '4',
      iconKey: 'power',
      label: 'Dificuldade para ligar',
      causes: [
        'Bateria fraca ou descarregada',
        'Alternador com defeito',
        'Motor de arranque com problema',
        'Velas ou cabos danificados',
      ],
      recommendations: [
        'Testar carga da bateria',
        'Verificar alternador',
        'Inspecionar sistema de ignição',
      ],
    },
    {
      id: '5',
      iconKey: 'cloudFog',
      label: 'Fumaça anormal',
      causes: [
        'Fumaça branca: Junta do cabeçote ou vazamento de água',
        'Fumaça azul: Queima de óleo',
        'Fumaça preta: Mistura rica de combustível',
      ],
      recommendations: [
        'Identificar cor da fumaça',
        'Verificar níveis de fluidos',
        'Consultar mecânico urgentemente',
      ],
    },
  ];

  selectSymptom(symptom: Symptom) {
    this.selectedSymptom.set(symptom);
  }

  closeDialog() {
    this.selectedSymptom.set(null);
  }

  getIcon(key: string): SafeHtml {
    const svg = ICONS[key] || '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
