import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { AuthService } from '../../services/auth.service';

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
  private readonly _authS  = inject( AuthService );
  private readonly _router = inject( Router );

  async logout(): Promise<any> {
    const res = await this._helper.showConfirmation( 'Are you sure?', 'The session will be ended', 'warning', 'Yes, logout' );
    localStorage.clear();
    this._helper.showToaster( 'success', 'Logout success', false, 'top-end', 2500 );
    setTimeout(() => {
      this._router.navigate( [ '/' ] );
    }, 2500 );
  }

}
