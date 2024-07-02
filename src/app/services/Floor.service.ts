import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseService } from './response.service';
import { environment } from '../../environments/environment.development';
import { Response } from '../interfaces/Response';
import { Floor } from '../interfaces/floor';


@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private _http     = inject( HttpClient );
  private _response = inject( ResponseService );

  urlApi = `${environment.urlApi}piso`;
  headers = new HttpHeaders();

  constructor() {
    const token = `Bearer ${localStorage.getItem( 'token' ) ?? ''}`;
    this.headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token
    });
  }

  getAll(): Observable<Response> {
    const url = `${this.urlApi}`;
    return this._http.get<Response>( url, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  find( id: number): Observable<Response> {
    const url = `${this.urlApi}/${ id }`;
    return this._http.get<Response>( url, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  store( data: Floor ): Observable<Response> {
    const url = `${this.urlApi}`;
    return this._http.post<Response>( url, data, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  update( data: Floor ): Observable<Response> {
    const url = `${this.urlApi}/${ data.id }`;
    return this._http.put<Response>( url, data, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }

  destroy( id: number ): Observable<Response> {
    const url = `${this.urlApi}/${ id }`;
    return this._http.delete<Response>( url, { headers: this.headers } )
    .pipe(
      catchError( error => {
        this._response.tokenCaducated( error );
        return throwError( error )
      } )
    );
  }


}
