import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Floor } from '../../interfaces/floor';
import { FormFloorComponent } from './form-floor/form-floor.component';
import { ListFloorComponent } from './list-floor/list-floor.component';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    FormFloorComponent,
    ListFloorComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  readonly panelOpenState  = signal(false);
  private readonly _helper = inject( HelpersService );

  operation: string = 'add';

  expandedFormUser:boolean = false;

  floor: Floor = {
    id: 0,
    piso: ''
  };



  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  closeForm( event: boolean ):void {
    this.expandedFormUser = event;
    this.operation = 'add';
  }

  handleSubmit( floor: Floor ): void {
    console.log( floor );
    if( floor.id === 0 ){
      //Add
    } else {
      //Edit
    }
  }

  addFloor(): void {

  }

  editFloor(): void {

  }

  fillEdit( floor: Floor ): void {
    this.floor = floor;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }


}
