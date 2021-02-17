import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpCustomResponse } from '@core/models';

export class HttpStandard {

  static extractData(res: HttpCustomResponse) {
    // controllo errori
    if (res.result.errCode !== 200) {
      // errore gestito da handleError
      throw res;
    }
    return res.data || {};
  }

  static switchCodeError(codeError: any): any {
    let message = 'Si è verificato un errore imprevisto. Si prega di riprovare';
    switch (codeError) {
      case 401: {
        message = 'Sessione scaduta o non valida. Si prega di effettuare la login';
        break;
      }
      case 404: {
        message = 'Non è possibile procedere con la richiesta: cliente non trovato';
        break;
      }
      default: {
        break;
      }
    }
    return message;
  }

  static handleError(error: any) {

    // errore http
    if (error instanceof HttpErrorResponse) {
      console.log('error');
      let errMsg: string;
      let statusError: number;

      errMsg = `${error.status} - ${error.error.message || ''}`;
      statusError = error.status || 999;

      return throwError({ message: errMsg, status: error.status, errorBody: error.error });
    }

    const errorRes = error.result;
    const errorData = error.data;

    //let message = 'Si è verificato un errore imprevisto. Si prega di riprovare';
    
    const message = this.switchCodeError(errorRes.errCode);

    return throwError({
      message: message,
      status: errorRes.errCode,
      errorBody: errorRes,
      data: errorData || {}
    });

  }
}
