import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { User } from '../../interfaces/User';
import { FormUserComponent } from './form-user/form-user.component';
import { ListUserComponent } from './list-user/list-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormUserComponent,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatSortModule,
    ListUserComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  private readonly _formBuilder = inject( FormBuilder );

  readonly panelOpenState = signal(false);

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

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  closeForm( event: boolean ):void {
    this.expandedFormUser = event;
    this.operation = 'add';
  }

  handleSubmit( user: any ): void {
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

  destroy( id: number ): void {
    console.log( 'destroy ' + id );
  }

}
