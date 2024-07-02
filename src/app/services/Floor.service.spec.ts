/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FloorService } from './Floor.service';

describe('Service: Floor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloorService]
    });
  });

  it('should ...', inject([FloorService], (service: FloorService) => {
    expect(service).toBeTruthy();
  }));
});
