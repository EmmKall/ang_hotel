import { inject, Injectable } from '@angular/core';
import { HelpersService } from './helpers.service';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private _helper = inject( HelpersService );
  private _router = inject( Router );

  constructor() { }

  getResponseHttp( response: Response, labels: Array<string> = [] ): void {
    const { status } = response;
    if( status === 200 || status === 201 ){
      const { msg } = response;
      this._helper.showMessage( 'Success', msg, 'success', 3000 );
      return;
    } else if( status >= 400 && status <= 404 ){
      const {  msg }  = response;
      if( status === 500 ){
        this.showErrors( msg, labels );
      }else {
        this._helper.showMessage( 'Error', msg, 'error', 3000 );
      }
      return;
    } else {
      this._helper.showMessage( 'Error', 'Something wrong happened', 'error', 3000 );
      return;
    }
  }

  tokenCaducated( error: any ): void {
    const { status, statusText } = error;
    if( status === 401 && statusText === 'Unauthorized' ){
      this._helper.showMessage( 'Unauthorized', 'The time of session is over, you need to login again', 'error', 4000 );
      setTimeout(() => {
        localStorage.clear();
        this._router.navigate( [ '/login' ] );
      }, 4000 );
    } else {
      this._helper.showMessage( 'Error', statusText ?? 'Communication error', 'error', 3000 );
    }
    console.log( error );
  }

  showErrors( errors: any, labels: Array<any> ):void {
    let text: string = '';
    labels.forEach( label => {
      if( errors[ label ] ){
        text += `<p class="text-red-500 font-bold">${errors[ label ]}</p>`;
      }
    });
    this._helper.showMessage( 'Error', 'Errors: ', 'error', 2500 );
  }

}
