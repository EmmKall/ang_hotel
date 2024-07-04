import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ListGuestComponent } from './list-guest/list-guest.component';
import { FormGuestComponent } from './form-guest/form-guest.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HelpersService } from '../../services/helpers.service';
import { Guest } from '../../interfaces/guest';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    CommonModule,
    ListGuestComponent,
    FormGuestComponent,
    LoadingComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {

  readonly panelOpenState   = signal(false);
  private readonly _helper  = inject( HelpersService );
  private readonly _guest   = inject( GuestService );

  operation:    string = 'add';
  updatedList: boolean = false;
  loading:     boolean = false;

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

  cleanForm(): void {
    this.guest = {
      id: 0,
      name: '',
      last_name: '',
      email: '',
      phone: '',
      born_day: '',
      sex: ''
    }
  }

  handleSubmit( guest: Guest ): void {
    this.guest = guest;
    if( guest.id === 0 ){
      this.addGuest();
    } else {
      this.editGuest();
    }
  }

  addGuest(): void {
    console.log( this.guest );
    this.loading = true;
    this._guest.store( this.guest ).subscribe( res => {
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
        this.closeForm( false );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  editGuest(): void {
    this.loading = true;
    this._guest.update( this.guest ).subscribe( res => {
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
        this.closeForm( false );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  fillEdit( guest: Guest ): void {
    this.guest = guest;
    this.expandedFormGuest = true;
    this.operation = 'edit';
  }


}
