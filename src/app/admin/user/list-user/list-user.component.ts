import { User } from './../../../interfaces/User';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, output, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HelpersService } from '../../../services/helpers.service';
import { UserService } from '../../../services/user.service';

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
  private _userS         = inject( UserService );

  editUserId = output<User>();
  loadingE   = output<void>();

  @ViewChild(MatSort) sort!: MatSort;

  data: User[]     = [];

  displayedColumns: string[] = ['name', 'email', 'phone', 'rol', 'actions'];
  dataSource = new MatTableDataSource( this.data );

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this._userS.getAll().subscribe( res => {
      const { status } = res;
      if( status === 200 ){
        const { data } = res;
        this.data = data;
        this.dataSource = new MatTableDataSource( this.data );
      }else if( status === 400 || status === 401 ) {

      } else {

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

  editUser( id: number ):void {
    const user = this.data.filter( item => item.id === id )[ 0 ];
    this.editUserId.emit( user );
  }

  async destroy( id: number ): Promise<void> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'User will be delete', 'warning', 'Yes, delete' );
    const { isConfirmed } = res;
    if( isConfirmed ){
      this.loadingE.emit();
      this._userS.destroy( id ).subscribe( res => {
        const { status, msg } = res;
        if( status === 200 ){
          this.getData();
          this._helper.showToaster( 'success', msg, false, 'top-end', 2000 );
          this.getData();
          this.loadingE.emit();
        } else if( status === 400 || status === 404 ){
          this._helper.showToaster( 'error', msg, false, 'top-end', 2000 );
          this.loadingE.emit();
        } else {
          this._helper.showToaster( 'error', 'Something wrong happened', false, 'top-end', 2000 );
          this.loadingE.emit();
        }
      });
    }
  }

}
