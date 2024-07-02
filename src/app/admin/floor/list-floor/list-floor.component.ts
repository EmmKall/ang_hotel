import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, Input, output, SimpleChanges, ViewChild } from '@angular/core';
import { Floor } from '../../../interfaces/floor';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HelpersService } from '../../../services/helpers.service';
import { FloorService } from '../../../services/Floor.service';

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
  private _floor         = inject( FloorService );

  editFloorId = output<Floor>();

  @ViewChild(MatSort) sort!: MatSort;

  @Input() loadingData:boolean = false;

  data: Array<Floor> = [];

  displayedColumns: string[] = ['floor', 'actions'];
  dataSource = new MatTableDataSource( this.data );

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges( changes: SimpleChanges ): void {
    if( this.loadingData ){
      this.getData();
      this.loadingData = false;
    }
  }

  getData(): void {
    this._floor.getAll().subscribe( res => {
      const { status, msg } = res;
      if( status === 200 ){
        const { data } = res;
        this.data = data;
        this.dataSource = new MatTableDataSource( this.data );
      } else if( status === 400 || status === 404 ){
        this._helper.showMessage( 'Error', msg, 'error', 2000 );
      } else {
        this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
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

  editFloor( id: number ):void {
    const floor = this.data.filter( item => item.id === id )[ 0 ];
    console.log( floor );
    this.editFloorId.emit( floor );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){
      this._floor.destroy( id ).subscribe( res => {
        const { status, msg } = res;
        if( status === 200 ){
          this.getData();
          this._helper.showMessage( 'Success', msg, 'success', 2000 );
        } else if( status === 400 || status === 404 ) {
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        }
      });

    }
  }

}
