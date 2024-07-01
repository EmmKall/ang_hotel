import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AppService } from './app.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseService } from './response.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _http     = inject( HttpClient );
  //private _app      = inject( AppService );
  private _response = inject( ResponseService );

  urlApi = `${environment.urlApi}auth/`;
  headers = new HttpHeaders();

  constructor(  ) {
    this.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ localStorage.getItem( 'token' ) ?? '' }`
    });
  }

  login( data: any ): Observable<any> {
    const url = `${this.urlApi}login`;
    console.log( url );
    return this._http.post<any>( url, data, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  logout( data: any ): Observable<any> {
    const url = `${this.urlApi}logout`;
    console.log( url );
    return this._http.post<any>( url, data, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  /* updatePassword( data: any ): Observable<Response> {
    const url = `${this.urlApi}change_password/${data.id}`;
    return this._http.put<Response>( url, data, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  } */

  /* logout(): Observable<Response> {
    const url = `${this.urlApi}logout`;
    return this._http.post<Response>( url, {}, { headers: this.headers })
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error );
      })
    );
  } */

  /* confirmToken( token: string ): Observable<Response> {
    const url = `${this.urlApi}confirm_account/${token}`;
    return this._http.get<Response>( url, { headers: this.headers })
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error );
      })
    );
  } */

  /* forgetPassword( data: any ): Observable<Response> {
    const url = `${this.urlApi}forget_password/`;
    return this._http.post<Response>( url, data, { headers: this.headers })
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error );
      })
    );
  } */

}
