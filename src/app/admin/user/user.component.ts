import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { User } from '../../interfaces/User';
import { FormUserComponent } from './form-user/form-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { HelpersService } from '../../services/helpers.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormUserComponent,
    ListUserComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  readonly panelOpenState   = signal(false);
  private readonly _helper  = inject( HelpersService );
  private readonly _user    = inject( UserService );

  operation: string = 'add';

  expandedFormUser:boolean = false;

  user: User = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    rol: 0
  };

  constructor() {
  }

  ngOnInit(): void {
    this.getDate();
  }

  ngAfterViewInit() {
  }

  getDate(): void {
    this._user.getAll().subscribe( res => { console.log( res );

    });
  }

  closeForm( event: boolean ):void {
    this.expandedFormUser = event;
    this.operation = 'add';
  }

  handleSubmit( user: User ): void {
    console.log( user );
    if( user.id === 0 ){
      //Add
    } else {
      //Edit
    }
  }

  addUser(): void {

  }

  editUser(): void {

  }

  fillEdit( user: User ): void {
    this.user = user;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }

}
