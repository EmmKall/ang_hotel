import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { Room } from '../../../interfaces/room';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../../services/helpers.service';
import { Floor } from '../../../interfaces/floor';
import { CommonModule } from '@angular/common';

const ELEMENT_DATA: Floor[] = [
  {
    "id": 1,
    "piso": "Piso 01",
    "created_at": "2024-06-27T01:29:37.000000Z",
    "updated_at": "2024-06-27T01:29:37.000000Z",
    "cuarto": [
        {
            "id": 1,
            "cuarto": "101",
            "piso_id": 1,
            "created_at": "2024-06-27T01:37:47.000000Z",
            "updated_at": "2024-06-27T01:37:47.000000Z"
        },
        {
            "id": 2,
            "cuarto": "102",
            "piso_id": 1,
            "created_at": "2024-06-27T01:37:53.000000Z",
            "updated_at": "2024-06-27T01:37:53.000000Z"
        },
        {
            "id": 3,
            "cuarto": "103",
            "piso_id": 1,
            "created_at": "2024-06-27T01:37:58.000000Z",
            "updated_at": "2024-06-27T01:37:58.000000Z"
        },
        {
            "id": 4,
            "cuarto": "104",
            "piso_id": 1,
            "created_at": "2024-06-27T01:38:03.000000Z",
            "updated_at": "2024-06-27T01:38:03.000000Z"
        },
        {
            "id": 5,
            "cuarto": "105",
            "piso_id": 1,
            "created_at": "2024-06-27T01:38:08.000000Z",
            "updated_at": "2024-06-27T01:38:08.000000Z"
        }
    ]
},
{
    "id": 2,
    "piso": "Piso 02",
    "created_at": "2024-06-27T01:29:46.000000Z",
    "updated_at": "2024-06-27T01:29:46.000000Z",
    "cuarto": [
        {
            "id": 6,
            "cuarto": "201",
            "piso_id": 2,
            "created_at": "2024-06-27T01:38:27.000000Z",
            "updated_at": "2024-06-27T01:38:27.000000Z"
        },
        {
            "id": 7,
            "cuarto": "202",
            "piso_id": 2,
            "created_at": "2024-06-27T01:38:30.000000Z",
            "updated_at": "2024-06-27T01:38:30.000000Z"
        },
        {
            "id": 8,
            "cuarto": "203",
            "piso_id": 2,
            "created_at": "2024-06-27T01:38:35.000000Z",
            "updated_at": "2024-06-27T01:38:35.000000Z"
        },
        {
            "id": 9,
            "cuarto": "204",
            "piso_id": 2,
            "created_at": "2024-06-27T01:38:39.000000Z",
            "updated_at": "2024-06-27T01:38:39.000000Z"
        }
    ]
},
{
    "id": 3,
    "piso": "Piso 03",
    "created_at": "2024-06-27T01:29:51.000000Z",
    "updated_at": "2024-06-27T01:29:51.000000Z",
    "cuarto": [
        {
            "id": 10,
            "cuarto": "301",
            "piso_id": 3,
            "created_at": "2024-06-27T01:38:45.000000Z",
            "updated_at": "2024-06-27T01:38:45.000000Z"
        },
        {
            "id": 11,
            "cuarto": "302",
            "piso_id": 3,
            "created_at": "2024-06-27T01:38:48.000000Z",
            "updated_at": "2024-06-27T01:38:48.000000Z"
        },
        {
            "id": 12,
            "cuarto": "303",
            "piso_id": 3,
            "created_at": "2024-06-27T01:38:53.000000Z",
            "updated_at": "2024-06-27T01:38:53.000000Z"
        },
        {
            "id": 13,
            "cuarto": "304",
            "piso_id": 3,
            "created_at": "2024-06-27T01:38:56.000000Z",
            "updated_at": "2024-06-27T01:38:56.000000Z"
        },
        {
            "id": 14,
            "cuarto": "305",
            "piso_id": 3,
            "created_at": "2024-06-27T01:39:03.000000Z",
            "updated_at": "2024-06-27T01:39:03.000000Z"
        }
    ]
},
];

@Component({
  selector: 'app-list-room',
  standalone: true,
  imports: [
    CommonModule,
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

  rooms: Room[] = [];
  floors: Floor[]  = [];

  constructor() {

  }

  ngOnInit(): void {
    this.floors = ELEMENT_DATA;
    this.FilterRooms();
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

  FilterRooms() {

    this.rooms.forEach( element => {
      const idFloor = element.id;

    });
  }

  editFloor( id: number ):void {
    const room = ELEMENT_DATA.filter( item => item.id === id )[ 0 ];
    //this.editFloorId.emit( room );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){

      this._helper.showToaster( 'success', 'Floor was deleted', false, 'top-end', 2000 );
    }
  }

}
