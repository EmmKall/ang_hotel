import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule, MatTab } from '@angular/material/tabs';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FloorComponent } from './floor/floor.component';
import { RoomComponent } from './room/room.component';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatTabsModule,
    MatTab,
    UserComponent,
    FloorComponent,
    RoomComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
