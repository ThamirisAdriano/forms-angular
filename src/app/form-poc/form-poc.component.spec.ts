import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPocComponent } from './form-poc.component';

describe('FormPocComponent', () => {
  let component: FormPocComponent;
  let fixture: ComponentFixture<FormPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
