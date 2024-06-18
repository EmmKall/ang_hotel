import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFloorComponent } from './form-floor.component';

describe('FormFloorComponent', () => {
  let component: FormFloorComponent;
  let fixture: ComponentFixture<FormFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFloorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
