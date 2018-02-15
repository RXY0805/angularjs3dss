import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  FormControl,
  Validator,
  ValidationErrors
} from '@angular/forms';

@Directive({
  selector: '[abn-validator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ABNValidatorDirective, multi: true }
  ]
})
export class ABNValidatorDirective implements Validator {
  validate(c: FormControl): ValidationErrors {
    const abn = c.value.replace(/[^\d]/, '');
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    let sum = 0;

    for (let index = 0; index <= weights.length - 1; index++) {
      const weight = weights[index];
      const digit = abn[index] - (index ? 0 : 1);
      sum += weight * digit;
    }
    const message = {
      abn: {
        message: 'is not valid abn number'
      }
    };
    const isValidABN = sum % 89 === 0;
    return isValidABN ? null : message;
  }
}
