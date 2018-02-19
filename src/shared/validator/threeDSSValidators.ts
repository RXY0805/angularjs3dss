import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class ThreeDSSValidators {
  static abnValidator(c: FormControl): ValidationErrors {
    const abn = c.value.replace(/[^\d]/, '');
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    let error = null;

    if (abn.length === 11) {
      let sum = 0;

      for (let index = 0; index <= weights.length - 1; index++) {
        const weight = weights[index];
        const digit = abn[index] - (index ? 0 : 1);
        sum += weight * digit;
      }

      if (sum % 89 !== 0) {
        error = 'This is invalid ABN number';
      }
      const message = {
        abnValidator: { message: error }
      };
      return error ? message : null;
    }
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      telephoneNumber: {
        message:
          'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {
    const message = {
      telephoneNumbers: {
        message: 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = form.controls;
    const hasPhoneNumbers =
      phoneNumbers && Object.keys(phoneNumbers).length > 0;

    return hasPhoneNumbers ? null : message;
  }
}
