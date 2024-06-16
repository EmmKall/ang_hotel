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

export interface User {
  id:        number;
  name:      string;
  last_name: string;
  email:     string;
  phone:     string;
  rol:       number;
}

const ELEMENT_DATA: User[] = [
  { id: 1, name: 'Hydrogen', last_name: 'as', email: '@mail', phone: 'H', rol: 0 },
  { id: 2, name: 'Helium', last_name: 'as', email: '@mail', phone: 'He', rol: 1 },
  { id: 3, name: 'Lithium', last_name: 'as', email: '@mail', phone: 'Li', rol: 1 },
  { id: 4, name: 'Beryllium', last_name: 'as', email: '@mail', phone: 'Be', rol: 1 },
  { id: 5, name: 'Boron', last_name: 'as', email: '@mail', phone: 'B' , rol: 1 },
  { id: 6, name: 'Carbon', last_name: 'as', email: '@mail', phone: 'C' , rol: 1 },
  { id: 7, name: 'Nitrogen', last_name: 'as', email: '@mail', phone: 'N', rol: 1},
  { id: 8, name: 'Oxygen', last_name: 'as', email: '@mail', phone: 'O' , rol: 1 },
  { id: 9, name: 'Fluorine', last_name: 'as', email: '@mail', phone: 'F', rol: 1 },
  { id: 10, name: 'Neon', last_name: 'as', email: '@mail', phone: 'Ne', rol: 1 },
];

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  readonly panelOpenState = signal(false);
  private readonly _formBuilder = inject( FormBuilder );
  private _liveAnnouncer = inject( LiveAnnouncer );

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  operation: string = 'add';

  expandedFormUser:boolean = false;

  formGroup = this._formBuilder.nonNullable.group({
    'id':        [ 0, [] ],
    'name':      [ '', [ Validators.required ] ],
    'last_name': [ '', [ Validators.required ] ],
    'email' :    [ '', [ Validators.required, Validators.email ],  ],
    'phone':     [ '', [ Validators.required ] ],
    'rol':       [ 0, [ Validators.required ] ]
  });

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  cleanFormGroup(): void {
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ 0, [] ],
      'name':      [ '', [ Validators.required ] ],
      'last_name': [ '', [ Validators.required ] ],
      'email' :    [ '', [ Validators.required, Validators.email ],  ],
      'phone':     [ '', [ Validators.required ] ],
      'rol':       [ 0, [ Validators.required ] ]
    });
    this.expandedFormUser = false;
    this.operation = 'Add';
  }

  handleSubmit(): void {
    console.log( this.formGroup.controls );
    if( this.formGroup.value.id === 0 ){
      //Add
    } else {
      //Edit
    }
  }

  addUser(): void {

  }

  editUser(): void {

  }

  async destroyUser( id: number ): Promise<void> {

  }

  fillEdit( id: number ): void {
    const row: User = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];

    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ row.id, [] ],
      'name':      [ row.name, [ Validators.required ] ],
      'last_name': [ row.last_name, [ Validators.required ] ],
      'email' :    [ row.email, [ Validators.required, Validators.email ],  ],
      'phone':     [ row.phone, [ Validators.required ] ],
      'rol':       [ row.rol, [ Validators.required ] ]
    });
    this.operation = 'Edit';
    this.expandedFormUser = true;
  }

  destroy( id: number ): void {
    console.log( 'destroy ' + id );
  }

}
