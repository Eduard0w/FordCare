import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDiagnosticoComponent } from './card-diagnostico.component';

describe('CardDiagnosticoComponent', () => {
  let component: CardDiagnosticoComponent;
  let fixture: ComponentFixture<CardDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDiagnosticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
