import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGuestComponent } from './form-guest.component';

describe('FormGuestComponent', () => {
  let component: FormGuestComponent;
  let fixture: ComponentFixture<FormGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
