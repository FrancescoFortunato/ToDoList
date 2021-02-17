import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 * https://ng-bootstrap.github.io/#/components/datepicker/api#NgbDateParserFormatter
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    // return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    return date ? date.day.toString().padStart(2, '0') + this.DELIMITER + date.month.toString().padStart(2, '0') + this.DELIMITER + date.year : null;
  }
}

