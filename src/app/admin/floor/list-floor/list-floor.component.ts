import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { Floor } from '../../../interfaces/floor';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../../services/helpers.service';

const ELEMENT_DATA: Floor[] = [
  { id: 1, floor: 'Hydrogen' },
  { id: 2, floor: 'Helium' },
  { id: 3, floor: 'Lithium' },
  { id: 4, floor: 'Beryllium' },
  { id: 5, floor: 'Boron' },
  { id: 6, floor: 'Carbon' },
  { id: 7, floor: 'Nitrogen' },
  { id: 8, floor: 'Oxygen' },
  { id: 9, floor: 'Fluorine' },
  { id: 10, floor: 'Neon' },
];

@Component({
  selector: 'app-list-floor',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatSort,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './list-floor.component.html',
  styleUrl: './list-floor.component.css'
})
export class ListFloorComponent {

  private _liveAnnouncer = inject( LiveAnnouncer );
  private _helper        = inject( HelpersService );

  editFloorId = output<Floor>();

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['floor', 'actions'];
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
    const floor = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];
    this.editFloorId.emit( floor );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){

      this._helper.showToaster( 'success', 'Floor was deleted', false, 'top-end', 2000 );
    }
  }

}
