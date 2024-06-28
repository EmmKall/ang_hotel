import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCalendarComponent } from './book-calendar.component';

describe('BookCalendarComponent', () => {
  let component: BookCalendarComponent;
  let fixture: ComponentFixture<BookCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
