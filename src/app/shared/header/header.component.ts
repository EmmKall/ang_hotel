import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private readonly _helper = inject( HelpersService );

  async logout(): Promise<any> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'The session will be ended', 'warning', 'Yes, logout' );
    console.log( res );
  }

}
