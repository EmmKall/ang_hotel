import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ListGuestComponent } from './list-guest/list-guest.component';
import { FormGuestComponent } from './form-guest/form-guest.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Guest } from '../../interfaces/guest';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    CommonModule,
    ListGuestComponent,
    FormGuestComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

  readonly panelOpenState   = signal(false);
  private readonly _helper  = inject( HelpersService );

  operation: string = 'add';

  expandedFormGuest:boolean = false;

  guest: Guest = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    born_day: '',
    sex: ''
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  closeForm( event: boolean ):void {
    this.expandedFormGuest = event;
    this.operation = 'add';
  }

  handleSubmit( guest: Guest ): void {
    console.log( guest );
    if( guest.id === 0 ){
      //Add
    } else {
      //Edit
    }
  }

  addUser(): void {

  }

  editUser(): void {

  }

  fillEdit( guest: Guest ): void {
    this.guest = guest;
    this.expandedFormGuest = true;
    this.operation = 'edit';
  }


}
