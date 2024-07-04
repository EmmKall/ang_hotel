import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, Input, output, SimpleChanges, ViewChild } from '@angular/core';
import { Room } from '../../../interfaces/room';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../../services/helpers.service';
import { Floor } from '../../../interfaces/floor';
import { CommonModule } from '@angular/common';
import { FloorService } from '../../../services/Floor.service';
import { RoomService } from '../../../services/room.service';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-list-room',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
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
  private _floor         = inject( FloorService );
  private _room          = inject( RoomService );

  editFloorId = output<Room>();

  @Input() updatedList: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  data: Array<Floor> = [];

  loading: boolean  = false;

  displayedColumns: string[] = ['floor', 'room', 'actions'];
  dataSource = new MatTableDataSource( this.data );

  rooms:   Room[] = [];
  floors: Floor[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.FilterRooms();
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if( this.updatedList ){
      this.getData();
      this.updatedList = false;
    }
  }

  getData(): void {
    this._floor.getAll().subscribe( res => {
      const { status, msg } = res;
      if( status === 200 || status === 201 ){
        const { data } = res;
        this.data = data;
      } else if( status === 400 || status === 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happenend', 'error', 2000 );
      }
    });
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

  FilterRooms() {
    this.floors.forEach( item => {

    });
  }

  editFloor( id: number ):void {
    let room: Room = {
      id: 0,
      cuarto: '',
      piso_id: 0,
    };
    this.data.forEach( item => {
      const data = item.cuarto ?? [];
      room = data.filter( row => row.id === id )[ 0 ] ?? room;
    });
    this.editFloorId.emit( room );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){
      this.loading = true;
      this._room.destroy( id ).subscribe( res => {
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          this._helper.showMessage( 'Success', msg, 'success', 2000 );
          this.getData();
          this.loading = false;
        } else if( status === 400 || status === 404 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
          this.loading = false;
        } else {
          this._helper.showMessage( 'Error', 'Somethin wrong happened', 'error', 2000 );
          this.loading = false;
        }
      });
      this._helper.showToaster( 'success', 'Floor was deleted', false, 'top-end', 2000 );
    }
  }

}
