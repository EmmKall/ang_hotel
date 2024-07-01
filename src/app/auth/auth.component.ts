import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HelpersService } from '../services/helpers.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loading: boolean = false;

  private readonly _formBuilder = inject( FormBuilder );
  private readonly _authS       = inject( AuthService );
  private readonly _helper      = inject( HelpersService );
  private readonly _router      = inject( Router );

  formGroup = this._formBuilder.nonNullable.group({
    'email':    [ '', [ Validators.required ] ],
    'password': [ '', [ Validators.required ] ],
  });

  constructor() { }

  ngOnInit() {

  }

  handleSubmit(): void {
    this.loading = true;
    if( !this.formGroup.valid ){
      this._helper.showMessage( 'Missing data', 'Fill all fields', 'error', 2000 );
      this.loading = false;
      return;
    }
    const data = this.formGroup.value;
    this._authS.login( data ).subscribe( res =>{
      const { access_token, expires_in } = res;
      if( access_token !== null && access_token.length > 0 && expires_in > 0 ){
        //
        const  { id, rol, name, last_name } = res;
        const user = `${name} ${last_name}` ?? '';
        //localStorage.setItem( 'id', `${id}` );
        //localStorage.setItem( 'rol', `${rol}` );
        //localStorage.setItem( 'user', user );
        localStorage.setItem( 'token', access_token );
        //localStorage.setItem( 'notifications', `${notifications}` );
        this._router.navigate( [ 'admin' ] );
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }

}
