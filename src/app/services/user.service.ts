import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseService } from './response.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http     = inject( HttpClient );
  private _response = inject( ResponseService );

  urlApi = `${environment.urlApi}user/`;
  headers = new HttpHeaders();

  constructor() {
    const token = `Bearer ${localStorage.getItem( 'token' ) ?? ''}`;
    console.log( token);
    this.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    });
    console.log( this.headers );
  }

  getAll(): Observable<Response> {
    const url = `${this.urlApi}`;
    console.log( url );
    console.log( this.headers );
    return this._http.get<Response>( url, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

}
