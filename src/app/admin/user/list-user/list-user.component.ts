import { User } from './../../../interfaces/User';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HelpersService } from '../../../services/helpers.service';

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
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSort,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {

  private _liveAnnouncer = inject( LiveAnnouncer );
  private _helper        = inject( HelpersService );

  editUserId = output<User>();

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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

  editUser( id: number ):void {
    const user = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];
    this.editUserId.emit( user );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){

      this._helper.showToaster( 'success', 'User was deleted', false, 'top-end', 2000 );
    }
  }

}
