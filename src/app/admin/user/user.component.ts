import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { User } from '../../interfaces/User';
import { FormUserComponent } from './form-user/form-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { HelpersService } from '../../services/helpers.service';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormUserComponent,
    ListUserComponent,
    LoadingComponent,
    MatCardModule,
    MatExpansionModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  readonly panelOpenState   = signal(false);
  private readonly _helper  = inject( HelpersService );
  private readonly _userS   = inject( UserService );

  operation:   string = 'add';
  updatedList: boolean = false;

  expandedFormUser:boolean = false;

  user: User = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    rol: 0
  };

  loading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  closeForm( event: boolean ):void {
    this.expandedFormUser = event;
    this.operation = 'add';
    this.updatedList = true;
  }

  cleanUser(): void {
    this.user = {
      id: 0,
      name: '',
      last_name: '',
      email: '',
      phone: '',
      rol: 0
    };
  }

  toggleLoading():void {
    this.loading = !this.loading;
  }

  handleSubmit( user: User ): void {
    this.user = user;
    if( this.user.id === 0 ){
      this.addUser();
    } else {
      this.editUser();
    }
  }

  addUser(): void {
    this.loading = true;
    this._userS.store( this.user ).subscribe( res => { console.log( res );
      const { status, msg } = res;
      if( status === 200 || 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.closeForm( false );
        //Clean form
        this.cleanUser();
        this.loading = false;
        this.closeForm( false );
      } else if( status === 400 || status === 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happend', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  editUser(): void {
    this.loading = true;
    this._userS.update( this.user ).subscribe( res => { console.log( res );
      const { status, msg } = res;
      if( status === 200 || 201 ){
        this._helper.showMessage( 'Success', msg, 'success', 2000 );
        this.closeForm( false );
        //Clean form
        this.cleanUser();
        this.loading = false;
      } else if( status === 400 || status === 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
        this.loading = false;
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happend', 'error', 2000 );
        this.loading = false;
      }
    });
  }

  fillEdit( user: User ): void {
    this.user = user;
    this.expandedFormUser = true;
    this.operation = 'edit';
  }

}
