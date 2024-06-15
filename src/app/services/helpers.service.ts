import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  showMessage( title: string, text: string, icon: any, timer: number ): void{
    Swal.fire({ title, text, icon,timer });
  }


  showToaster( icon: any, title: string, showConfirmButton: boolean, position: any = 'top-end', timer: number = 2000 ):void {
    Swal.fire({ position, icon, title, showConfirmButton, timer });
  }


  async showConfirmation( title: string, text: string, icon: any = 'warning', confirmButtonText: string ): Promise<any> {
    let res: any;
    await Swal.fire({
      title, text, icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText
    }).then((result) => { res = result; });
    return res;
  }

}
