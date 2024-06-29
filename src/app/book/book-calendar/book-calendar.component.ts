import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-book-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    CommonModule,
  ],
  templateUrl: './book-calendar.component.html',
  styleUrl: './book-calendar.component.css'
})
export class BookCalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth', //timeGridDay
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    selectable: true,
    dateClick: (arg) => this.handleDateClick(arg),
    select: ( arg ) => this.handleDateSelect( arg ),
    eventClick: ( arg ) => this.handleEventClil( arg ),
    eventMouseEnter: ( arg ) => this.handleEventMouseEnter( arg ),
    events: [
      { title: 'event 1', date: '2024-06-01' },
      { title: 'event 2', date: '2024-06-02' }
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  handleDateClick(arg: any):void {
    alert('date click! ' + arg.dateStr)
  }

  handleDateSelect( arg: any ):void {
    alert('selected ' + arg.startStr + ' to ' + arg.endStr);
  }

  handleEventClil( arg:any ):void {
    console.log( arg );
  }

  handleEventMouseEnter( arg: any ):void {
    console.log( arg );
  }

}
