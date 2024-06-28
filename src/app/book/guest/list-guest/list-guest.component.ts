import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guest } from '../../../interfaces/guest';
import { HelpersService } from '../../../services/helpers.service';

const ELEMENT_DATA: Guest[] = [
  { id: 1, name: 'Hydrogen', last_name: 'as', email: '@mail', phone: 'H', born_day: '15-04-1992', sex: 'male' },
  { id: 2, name: 'Helium', last_name: 'as', email: '@mail', phone: 'He', born_day: '15-04-1992', sex: 'famele' },
  { id: 3, name: 'Lithium', last_name: 'as', email: '@mail', phone: 'Li', born_day: '15-04-1992', sex: 'male' },
  { id: 4, name: 'Beryllium', last_name: 'as', email: '@mail', phone: 'Be', born_day: '15-04-1992', sex: 'famele' },
  { id: 5, name: 'Boron', last_name: 'as', email: '@mail', phone: 'B', born_day: '15-04-1992', sex: 'male' },
  { id: 6, name: 'Carbon', last_name: 'as', email: '@mail', phone: 'C', born_day: '15-04-1992', sex: 'famele' },
  { id: 7, name: 'Nitrogen', last_name: 'as', email: '@mail', phone: 'N', born_day: '15-04-1992', sex: 'male'},
  { id: 8, name: 'Oxygen', last_name: 'as', email: '@mail', phone: 'O' , born_day: '15-04-1992', sex: 'famele' },
  { id: 9, name: 'Fluorine', last_name: 'as', email: '@mail', phone: 'F', born_day: '15-04-1992', sex: 'male' },
  { id: 10, name: 'Neon', last_name: 'as', email: '@mail', phone: 'Ne', born_day: '15-04-1992', sex: 'male' },
];

@Component({
  selector: 'app-list-guest',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSort,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './list-guest.component.html',
  styleUrl: './list-guest.component.css'
})
export class ListGuestComponent {

  private _liveAnnouncer = inject( LiveAnnouncer );
  private _helper        = inject( HelpersService );

  editUserId = output<Guest>();

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'email', 'phone', 'born_day', 'sex', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {

  }

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

  editGuest( id: number ):void {
    const guest = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];
    this.editUserId.emit( guest );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){

      this._helper.showToaster( 'success', 'User was deleted', false, 'top-end', 2000 );
    }
  }




}

