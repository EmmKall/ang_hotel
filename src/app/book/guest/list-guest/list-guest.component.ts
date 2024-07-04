import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, Input, output, SimpleChanges, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guest } from '../../../interfaces/guest';
import { HelpersService } from '../../../services/helpers.service';
import { GuestService } from '../../../services/guest.service';

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
  private _guest         = inject( GuestService );

  editUserId = output<Guest>();

  @Input() updatedList: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  data: Guest[] = [];

  loading: boolean  = false;

  displayedColumns: string[] = ['name', 'email', 'phone', 'born_day', 'sex', 'actions'];
  dataSource = new MatTableDataSource( this.data );

  constructor() {

  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges( changes: SimpleChanges ): void {
    console.log( this.updatedList );
    if( this.updatedList ){
      this.getData();
      this.updatedList = false;
    }
  }

  getData(): void {
    this._guest.getAll().subscribe( res => {
      const { status, msg } = res;
      if( status === 200 || status === 201 ){
        const { data } = res;
        this.data = data;
        this.dataSource = new MatTableDataSource( this.data );
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editGuest( id: number ):void {
    const guest = this.data.filter( item => item.id === id )[ 0 ];
    this.editUserId.emit( guest );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){
      this.loading = true;
      this._guest.destroy( id ).subscribe( res => {
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

