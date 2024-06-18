import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { Room } from '../../../interfaces/room';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../../services/helpers.service';

const ELEMENT_DATA: Room[] = [
  { id: 1, floor: { id: 0, floor: 'Hydrogen'}, room: 'room 01' },
  { id: 2, floor: { id: 0, floor: 'Helium'}, room: 'room 02' },
  { id: 3, floor: { id: 0, floor: 'Lithium'}, room: 'room 03' },
  { id: 4, floor: { id: 0, floor: 'Beryllium'}, room: 'room 04' },
  { id: 5, floor: { id: 0, floor: 'Boron'}, room: 'room 05' },
  { id: 6, floor: { id: 0, floor: 'Carbon'}, room: 'room 06' },
  { id: 7, floor: { id: 0, floor: 'Nitrogen'}, room: 'room 07' },
  { id: 8, floor: { id: 0, floor: 'Oxygen'}, room: 'room 08' },
  { id: 9, floor: { id: 0, floor: 'Fluorine'}, room: 'room 09' },
  { id: 10, floor: { id: 0, floor: 'Neon'}, room: 'room 10' },
];

@Component({
  selector: 'app-list-room',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSort,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.css'
})
export class ListRoomComponent {

  private _liveAnnouncer = inject( LiveAnnouncer );
  private _helper        = inject( HelpersService );

  editFloorId = output<Room>();

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['floor', 'room', 'actions'];
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

  announceSortChange(sortState: Sort ) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editFloor( id: number ):void {
    const room = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];
    this.editFloorId.emit( room );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){

      this._helper.showToaster( 'success', 'Floor was deleted', false, 'top-end', 2000 );
    }
  }

}
