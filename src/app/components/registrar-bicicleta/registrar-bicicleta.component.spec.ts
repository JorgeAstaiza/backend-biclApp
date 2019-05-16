import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarBicicletaComponent } from './registrar-bicicleta.component';

describe('RegistrarBicicletaComponent', () => {
  let component: RegistrarBicicletaComponent;
  let fixture: ComponentFixture<RegistrarBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
