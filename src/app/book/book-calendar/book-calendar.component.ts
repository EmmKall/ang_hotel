import { CommonModule } from '@angular/common';
import { Component, inject, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Book } from '../../interfaces/Book';
import { HelpersService } from '../../services/helpers.service';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { CalendarService } from '../../services/calendar.service';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../interfaces/guest';
import { RoomService } from '../../services/room.service';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-book-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    LoadingComponent,
    FullCalendarModule,
  ],
  templateUrl: './book-calendar.component.html',
  styleUrl: './book-calendar.component.css'
})
export class BookCalendarComponent {

    private readonly _formBuilder = inject( FormBuilder );
    private readonly _helper      = inject( HelpersService );
    private readonly _book        = inject( CalendarService );
    private readonly _guest       = inject( GuestService );
    private readonly _rooms       = inject( RoomService );

    private day:       number = 1000*60*60*24;

    operation: string = 'add';
    loading: boolean  = false;

    data: Book[]    = [];
    guests: Guest[] =[];
    rooms: Room[]   = [];

    book: Book = {
      id:         0,
      huesped_id: 0,
      cuarto_id:  0,
      in:         '',
      out:        '',
      check_in: 0
    };

    events: any[] = [];

    calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth', //timeGridDay
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      selectable: true,
      dateClick: (arg) => this.handleDateClick(arg),
      select: ( arg ) => this.handleDateSelect( arg ),
      eventClick: ( arg ) => this.handleEventClick( arg ),
      eventMouseEnter: ( arg ) => this.handleEventMouseEnter( arg ),
      events: this.events
    };

    formGroup = this._formBuilder.nonNullable.group({
      'id':        [ 0, [] ],
      'cuarto_id': [ 0, [ Validators.required ] ],
      'huesped_id':  [ 0, [ Validators.required ] ],
      'in': [ '', [ Validators.required ] ],
      'out' :    [ '', [ Validators.required ],  ],
    });

    showModal: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
      this.getData();
      this.getGuest();
      this.getRooms();
    }

    ngAfterContentInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    getData(): void {
      this._book.getAll().subscribe( res => {
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          const { data } = res;
          this.data = data;
          this.getEvents();
        } else if( status === 400 || status === 404 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happenend', 'error', 2000 );
        }
      });
    }

    getGuest():void {
      this._guest.getAll().subscribe( res => {
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          const { data } = res;
          this.guests = data;
        } else if( status === 400 || status === 401 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        }
      });
    }

    getRooms():void {
      this._rooms.getAll().subscribe( res => {
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          const { data } = res;
          this.rooms = data;
        } else if( status === 400 || status === 401 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
        }

      });
    }

    getEvents():void {
      this.events = [];
      this.data.forEach( item => {
        const data: any = item;
        const { huesped, cuarto } = data;
        const row = {
          id: item.id,
          title: `${ cuarto.cuarto }, ${ huesped.name } ${ huesped.last_name } from: ${ data.in } - to: ${ data.out }`,
          date: item.in,
          end: item.out,
        };
        this.events = [ ...this.events, row ];
      });
      this.calendarOptions.events = this.events;
    }

    handleDateClick(arg: any):void {
      //alert('date click! ' + arg.dateStr)
    }

    async handleDateSelect( arg: any ):Promise<void> {
      const inDay  = new Date( arg.startStr );
      const outDay = new Date( arg.endStr );
      const inFormat  = `${ inDay.getFullYear() }-${ ( inDay.getMonth() + 1 ).toString().padStart( 2, '0' ) }-${ ( inDay.getDate() + 1 ).toString().padStart( 2, '0' ) }`;
      const outFormat = `${ outDay.getFullYear() }-${ ( outDay.getMonth() + 1 ).toString().padStart( 2, '0' ) }-${ ( outDay.getDate() ).toString().padStart( 2, '0' ) }`;
      const data = await { inDay: inFormat, outDay: outFormat };
      await this.fillFormGroup( data );
    }

    handleEventClick( arg:any ):void {
      const id = parseInt( arg.event._def.publicId ) ?? 0;
      if( id === 0 ){ return; }
      //Obtener
      const row = this.events.filter( item => item.id === id )[ 0 ];
      if( row === null || row === undefined ){ return; }
      this.fillFormGroup( row );
    }

    handleEventMouseEnter( arg: any ):void {
      /* console.log( arg.event ); */
    }

    toggleModalAdd(): void {
      this.showModal= !this.showModal;
    }

    fillFormGroup( data: any ): void {
      let row;
      if( data.id ){
        row = this.data.filter( item => item.id === data.id )[ 0 ];
      } else {
        const { inDay, outDay } = data;
        row = { in: inDay, out: outDay, id: 0, huesped_id: 0, cuarto_id: 0,  }
      }
      if( row.id === 0 ){
        this.operation = 'Add';
      } else {
        this.operation = 'Edit';
      }
      this.formGroup = this._formBuilder.nonNullable.group({
        'id':        [ row.id, [] ],
        'cuarto_id': [ row.cuarto_id, [ Validators.required ] ],
        'huesped_id':  [ row.huesped_id, [ Validators.required ] ],
        'in':        [ row.in, [ Validators.required ] ],
        'out':       [ row.out, [ Validators.required ] ],
      });
      this.showModal = true;
    }

    handleSubmit():void {
      if( !this.formGroup.valid ) {
        this._helper.showMessage( 'Error', 'All data are required', 'error', 2000 );
        return;
      }
      const { id, cuarto_id, huesped_id, out, in: iin } = this.formGroup.value;
      this.book = { id: id ?? 0, cuarto_id:  cuarto_id ?? 0, huesped_id: huesped_id ?? 0, out: out ?? '', in: iin ?? '', check_in: 0 };
      this.book.in = ` ${ this.book.in.split( '-' )[0] }-${ ( parseInt( this.book.in.split( '-' )[1] ) - 1 ).toString().padStart( 0, '0' ) }-${ this.book.in.split( '-' )[2] }`;
      this.book.out = ` ${ this.book.out.split( '-' )[0] }-${ ( parseInt( this.book.out.split( '-' )[1] ) - 1 ).toString().padStart( 0, '0' ) }-${ this.book.out.split( '-' )[2] }`;
      if( this.formGroup.value.id === 0 ){ //Add
        this.addBook();
      } else { //Update
        this.updatedBook();
      }
    }

    addBook():void {
      this.loading = true;
      this._book.store( this.book ).subscribe( res => { console.log( res );
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          this.loading = false;
          this.getData();
          this.toggleModalAdd();
        } else if( status === 400 || status === 401 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
          this.loading = false;
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
          this.loading = false;
        }
      });
    }

    updatedBook():void {
      this.loading = true;
      this._book.update( this.book ).subscribe( res => { console.log( res );
        const { status, msg } = res;
        if( status === 200 || status === 201 ){
          this.loading = false;
          this.getData();
          this.toggleModalAdd();
        } else if( status === 400 || status === 401 ){
          this._helper.showMessage( 'Error', msg, 'error', 2000 );
          this.loading = false;
        } else {
          this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 2000 );
          this.loading = false;
        }
      });
    }

    async destroy():Promise<void> {
      console.log( this.book );
      const res =  await this._helper.showConfirmation( 'Are you sure to cancel?', 'You will cancel this book', 'warning', 'Yes, Cancel' );
      const { isConfirmed } = res;
      if( isConfirmed ){
        this.loading = true;
        this._book.destroy( this.book.id ).subscribe( res => {
          const { status, msg }= res;
          if( status === 200 ){
            this.loading = false;
            this.getData();
            this.toggleModalAdd();
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
