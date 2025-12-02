import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatVehicleComponent } from './creat-vehicle.component';

describe('CreatVehicleComponent', () => {
  let component: CreatVehicleComponent;
  let fixture: ComponentFixture<CreatVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatVehicleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
