import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { GuestComponent } from './guest/guest.component';
import { BookCalendarComponent } from './book-calendar/book-calendar.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
    FooterComponent,
    GuestComponent,
    BookCalendarComponent,
    MatCardModule,
    MatTabsModule,
    MatTab,

  ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
