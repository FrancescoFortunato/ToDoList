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
      case 405: {
        message = 'Non è possibile procedere con la richiesta: operatore non trovato';
        break;
      }
      case 412: {
        message = 'Parametri di ricerca non validi';
        break;
      }
      case 413: {
        message = 'Annullamento voucher regalato non riuscito. Nono risultano voucher regalati.';
        break;
      }
      case 421: {
        message = 'Parametri di ricerca non validi';
        break;
      }
      case 422: {
        message = 'Non è possibile procedere con la richiesta: cliente non valido';
        break;
      }
      case 423: {
        message = 'Non è possibile procedere con la richiesta: dati mancanti';
        break;
      }
      case 425: {
        message = 'Non è possibile procedere con la richiesta: occorre completare la procedura di optin';
        break;
      }
      case 426: {
        message = 'Utenza bloccata.';
        break;
      }
      case 427: {
        message = 'Non è possibile procedere con la richiesta: operatore non valido';
        break;
      }
      case 428: {
        message = 'I dati inseriti non sono corretti';
        break;
      }
      case 430: {
        message = 'Rivolgersi all\'amministrazione';
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
    return message;
  }

  // da qui passano gli errori custom e gli errori http
  // l'oggetto ritorato deve essere lo stesso
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

    // errore custom
    const errorRes = error.result;
    const errorData = error.data;

    let message = 'Si è verificato un errore imprevisto. Si prega di riprovare';
    if (errorRes.errCode === 422) {
      message = 'messaggio specifico';
    } else if (errorRes.errCode === 412) {
      console.log('errore 422');
      message = 'messaggio specifico';
    }

    message = this.switchCodeError(errorRes.errCode);

    return throwError({
      message: message,
      status: errorRes.errCode,
      errorBody: errorRes,
      data: errorData || {}
    });

  }
}
