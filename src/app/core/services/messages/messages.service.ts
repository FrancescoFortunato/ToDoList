import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  showErrorMessage(message: string) {
    Swal.fire('Error', message, 'error');
  }

  showSuccessMessage(message: string) {
    Swal.fire('Success', message, 'success');
  }

  showWarningMessage(message: string) {
    Swal.fire('Attention', message, 'warning');
  }

  showInfoMessage(message: string, callBackFunction?: Function) {

    const opt: SweetAlertOptions = {
      icon: 'info',
      text: message,
    };

    Swal.fire(opt).then((result) => {
      if (callBackFunction !== undefined) {
        callBackFunction();
      }
    });
  }

  showConfirmMessage(message: string, callBackFunction?: Function) {

    const opt: SweetAlertOptions = {
      icon: 'question',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    };

    Swal.fire(opt).then((result) => {
      if (result.value) {
        if (callBackFunction !== undefined) {
          callBackFunction();
        }
      }
    });
  }
}
