import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBicisComponent } from './listar-bicis.component';

describe('ListarBicisComponent', () => {
  let component: ListarBicisComponent;
  let fixture: ComponentFixture<ListarBicisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBicisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBicisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
