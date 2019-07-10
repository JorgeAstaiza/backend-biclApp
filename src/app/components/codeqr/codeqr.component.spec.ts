import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeqrComponent } from './codeqr.component';

describe('CodeqrComponent', () => {
  let component: CodeqrComponent;
  let fixture: ComponentFixture<CodeqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
