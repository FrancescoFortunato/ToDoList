import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 * https://ng-bootstrap.github.io/#/components/datepicker/api#NgbDateAdapter
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  // dalla stringa dd/mm/yyyy all'oggetto Data di bootstrap
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    // return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    return date
      ? date.day.toString().padStart(2, '0') +
          this.DELIMITER +
          date.month.toString().padStart(2, '0') +
          this.DELIMITER +
          date.year
      : null;
  }
}
