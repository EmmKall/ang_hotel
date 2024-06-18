import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFloorComponent } from './list-floor.component';

describe('ListFloorComponent', () => {
  let component: ListFloorComponent;
  let fixture: ComponentFixture<ListFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListFloorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
