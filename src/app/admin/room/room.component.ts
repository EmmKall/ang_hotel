import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormRoomComponent } from './form-room/form-room.component';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Room } from '../../interfaces/room';
import { ListUserComponent } from '../user/list-user/list-user.component';
import { ListRoomComponent } from './list-room/list-room.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
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

  operation: string = 'add';

  expandedFormUser:boolean = false;

  room: Room = {
    id: 0,
    floor: {
      id: 0,
      floor: ''
    },
    room: '',
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

  handleSubmit( room: Room ): void {
    console.log( room );
    if( room.id === 0 ){
      //Add
    } else {
      //Edit
    }
  }

  addUser(): void {

  }

  editUser(): void {

  }

  fillEdit( room: Room ): void {
    this.room = room;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }



}
