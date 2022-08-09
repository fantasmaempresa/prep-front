import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { genericErrorMessages } from '../../core/constants/validationMessages';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  getValidationErrors(
    group: FormGroup,
    validationMessages: { [key: string]: any }
  ) {
    let formErrors: { [key: string]: any } = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      formErrors[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        const groupError = this.getValidationErrors(
          abstractControl,
          validationMessages
        );
        formErrors = { ...formErrors, ...groupError };
      }
    });
    return formErrors;
  }

  matchConfirmItems(controlName: string, confirmControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];
      if (!control || !confirmControl) {
        return null;
      }
      if (confirmControl.errors && !confirmControl.errors['mismatch']) {
        return null;
      }
      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
      return null;
    };
  }

  getErrorMessage(control: AbstractControl) {
    let error = '';
    console.log(control.errors);
    if (control.errors) {
      const [[keyErr, objErr]]: [string, unknown][] = Object.entries(
        control.errors
      );
      console.log(keyErr, objErr);
      if (genericErrorMessages[keyErr]) {
        error = genericErrorMessages[keyErr](objErr);
      } else {
        error = `${keyErr} is not defined`;
      }
    }
    return error;
  }
}
