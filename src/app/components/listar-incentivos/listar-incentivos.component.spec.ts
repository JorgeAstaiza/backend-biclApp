import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarIncentivosComponent } from './listar-incentivos.component';

describe('ListarIncentivosComponent', () => {
  let component: ListarIncentivosComponent;
  let fixture: ComponentFixture<ListarIncentivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarIncentivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarIncentivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
