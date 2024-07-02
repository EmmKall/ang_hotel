import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Floor } from '../../interfaces/floor';
import { FormFloorComponent } from './form-floor/form-floor.component';
import { ListFloorComponent } from './list-floor/list-floor.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FloorService } from '../../services/Floor.service';

@Component({
  selector: 'app-floor',
  standalone: true,
  imports: [
    CommonModule,
    FormFloorComponent,
    ListFloorComponent,
    LoadingComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  readonly panelOpenState  = signal(false);
  private readonly _helper = inject( HelpersService );
  private readonly _floor  = inject( FloorService );

  operation: string    = 'add';
  loading: boolean     = false;
  updatedList: boolean = false;

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

  cleanForm(): void {
    this.floor
  }

  handleSubmit( floor: Floor ): void {
    this.floor = floor;
    if( this.floor.id === 0 ){
      this.addFloor();
    } else {
      this.editFloor();
    }
  }

  addFloor(): void {
    this.loading = true;
    this._floor.store( this.floor ).subscribe( res => {
      const{ status, msg } = res;
      if( status === 200 || status === 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.closeForm( false );
        this.cleanForm();
        this.loading = false;
        this.updatedList = true;
      } else if( status === 400 || status === 401 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  editFloor(): void {
    this.loading = true;
    this._floor.update( this.floor ).subscribe( res => {
      const{ status, msg } = res;
      if( status === 200 || status === 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.closeForm( false );
        this.cleanForm();
        this.loading = false;
        this.updatedList = true;
      } else if( status === 400 || status === 401 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  fillEdit( floor: Floor ): void {
    this.floor = floor;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }


}
