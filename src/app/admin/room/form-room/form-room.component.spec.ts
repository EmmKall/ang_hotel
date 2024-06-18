import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoomComponent } from './form-room.component';

describe('FormRoomComponent', () => {
  let component: FormRoomComponent;
  let fixture: ComponentFixture<FormRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
