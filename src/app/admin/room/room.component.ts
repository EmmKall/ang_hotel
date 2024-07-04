import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormRoomComponent } from './form-room/form-room.component';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Room } from '../../interfaces/room';
import { ListRoomComponent } from './list-room/list-room.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    FormRoomComponent,
    ListRoomComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  readonly panelOpenState   = signal(false);
  private readonly _helper  = inject( HelpersService );
  private readonly _room    = inject( RoomService );

  operation:    string = 'add';
  updatedList: boolean = false;
  loading:     boolean = false;

  expandedFormUser:boolean = false;

  room: Room = {
    id: 0,
    piso_id: 0,
    piso: {
      id: 0,
      piso: '',
      cuarto: []
    },
    cuarto: '',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  closeForm( event: boolean ):void {
    this.expandedFormUser = event;
    this.operation = 'add';
  }

  cleanForm(): void {
    this.room = {
      id: 0,
      piso_id: 0,
      piso: {
        id: 0,
        piso: '',
        cuarto: []
      },
      cuarto: '',
    }
  }

  handleSubmit( room: Room ): void {
    room.piso_id = room.piso?.id ?? 0;
    this.room = room;
    if( room.id === 0 ){
      this.addRoom();
    } else {
      this.editRoom();
    }
  }

  addRoom(): void {
    this.loading = true;
    this._room.store( this.room ).subscribe( res => {
      const { status, msg } = res;
      if( status === 200 || status === 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.loading = false;
        this.closeForm( false );
        this.cleanForm();
        this.updatedList = true;
      } else if( status === 400 || status == 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
        this.closeForm( false );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  editRoom(): void {
    this.loading = true;
    this._room.update( this.room ).subscribe( res => {
      const { status, msg } = res;
      if( status === 200 || status === 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.closeForm( false );
        this.cleanForm();
        this.loading = false;
        this.updatedList = true;
      } else if( status === 400 || status == 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  fillEdit( room: Room ): void {
    this.room = room;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }



}
