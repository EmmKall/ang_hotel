import { EventEmitter, inject, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() id$: EventEmitter<number>            = new EventEmitter<number>();
  @Output() user$: EventEmitter<string>          = new EventEmitter<string>();
  @Output() rol$: EventEmitter<number>           = new EventEmitter<number>();
  @Output() notifications$: EventEmitter<number> = new EventEmitter<number>();

  @Output() data$: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  login( data: any ): void {
    const  { id, rol, token, name, last_name, notifications } = data;
    const user = `${name} ${last_name}` ?? '';
    localStorage.setItem( 'id', `${id}` );
    localStorage.setItem( 'rol', `${rol}` );
    localStorage.setItem( 'user', user );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'notifications', `${notifications}` );
    /* this._app.id$.emit( id );
    this._app.user$.emit( user );
    this._app.rol$.emit( rol );
    this._app.notifications$.emit( notifications ); */
  }

  logout(): void {
    localStorage.clear();
  }

  getId(): number {
    let data:number = parseInt( localStorage.getItem( 'id' )! ) ?? 0;
    return data;
  }

  getUser(): string {
    let data:string = localStorage.getItem( 'user' ) ?? '';
    return data;
  }

  getRol(): number {
    let data:number = parseInt( localStorage.getItem( 'rol' )! ) ?? -1;
    return data;
  }

  getAuth(): string {
    let token:string = localStorage.getItem( 'token' ) ?? '';
    return token;
  }

}
