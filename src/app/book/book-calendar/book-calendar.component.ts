import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Book } from '../../interfaces/Book';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-book-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
  ],
  templateUrl: './book-calendar.component.html',
  styleUrl: './book-calendar.component.css'
})
export class BookCalendarComponent {

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _helper      = inject( HelpersService );

  private day: number = 1000*60*60*24;

  data: Book[] = [
    { id:          0,
      huesped_id:  0,
      cuardo_id:   0,
      in:          'string',
      out:         'string',
      check_in:    false,
      created_at: 'string',
      updated_at: 'string',
      guest:       { id: 0, name: '', last_name: '', born_day: '', email: '', phone: '', sex: '' },
      room:        { id: 0, piso: { id: 0, piso: '', created_at: '', updated_at: '', cuarto: [] }, cuarto: '', piso_id: 0, created_at: '', updated_at: '' } }
  ];

  events: any[] = [
    { id: 1, title: 'event 1', date: '2024-06-01', end: '2024-06-01' },
    { id: 2, title: 'event 2', date: '2024-06-02', end: '2024-06-03' },
    { id: 3, title: 'event 3', date: '2024-06-03', end: '2024-06-05' }
  ];

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
    'guest_id':  [ 0, [ Validators.required ] ],
    'in': [ '', [ Validators.required ] ],
    'out' :    [ '', [ Validators.required ],  ],
  });

  showModal: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  handleDateClick(arg: any):void {
    //alert('date click! ' + arg.dateStr)
  }

  async handleDateSelect( arg: any ):Promise<void> {
    const inDay  = new Date( arg.startStr );
    const outDay = new Date( arg.endStr );
    const inFormat  = `${ inDay.getFullYear() }-${ ( inDay.getMonth() + 2 ).toString().padStart( 2, '0' ) }-${ ( inDay.getDate() + 1 ).toString().padStart( 2, '0' ) }`;
    const outFormat = `${ outDay.getFullYear() }-${ ( outDay.getMonth() + 2 ).toString().padStart( 2, '0' ) }-${ ( outDay.getDate() ).toString().padStart( 2, '0' ) }`;
    const data = await { inDay: inFormat, outDay: outFormat };
    await this.fillFormGroup( data );
  }

  handleEventClick( arg:any ):void {
    const id = parseInt( arg.event._def.publicId ) ?? 0;
    if( id === 0 ){ return; }
    //Obtener
    const row = this.events.filter( item => item.id === id )[ 0 ];
    if( row === null || row === undefined ){ return; }
    console.log( row );
    this.fillFormGroup( row );
  }

  handleEventMouseEnter( arg: any ):void {
    /* console.log( arg.event ); */
  }

  toggleModalAdd(): void {
    this.showModal= !this.showModal;
  }

  fillFormGroup( data: any ): void {
    console.log( data );
    const { inDay, outDay } = data;
    this.formGroup = this._formBuilder.nonNullable.group({
      'id':        [ data.id ?? 0, [] ],
      'guest_id':  [ data.guest_id ?? 0, [ Validators.required ] ],
      'in':        [ data.in ?? inDay, [ Validators.required ] ],
      'out':       [ data.out ?? outDay, [ Validators.required ] ],
    });
    console.log( this.formGroup.value );
    this.showModal = true;
  }

  handleSubmit():void {
    if( this.formGroup.value.id === 0 ){ //Add
      console.log( 'add' );
    } else { //Update
      console.log( 'update' );
    }
  }

}
