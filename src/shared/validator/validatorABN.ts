import { AbstractControl } from '@angular/forms';

export function ValidateABN(control: AbstractControl) {
  control.setValue(control.value.replace(/[^0-9]/g, ''));
}
export function NumberOnly(control: AbstractControl) {
  control.setValue(control.value.replace(/[^0-9]/g, ''));
}
