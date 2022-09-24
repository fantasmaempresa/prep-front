import { FormGroup } from '@angular/forms';

export function ValidatorEquals(
  field: string,
  confirmField: string,
  errorType: string,
  equals = true
): any {
  return (formGroup: FormGroup) => {
    const controlField = formGroup.controls[field];
    const controlFieldConfirm = formGroup.controls[confirmField];
    // tslint:disable-next-line:max-line-length
    if (
      controlField.value !== null &&
      controlFieldConfirm.value !== null &&
      (controlFieldConfirm.valid || controlField.valid)
    ) {
      // controlField.setErrors(null);
      controlFieldConfirm.setErrors(null);
      if (equals) {
        if (controlField.value !== controlFieldConfirm.value) {
          controlFieldConfirm.setErrors({ [errorType]: true });
        }
      } else {
        if (controlField.value === controlFieldConfirm.value) {
          controlFieldConfirm.setErrors({ [errorType]: true });
        }
      }
    }
  };
}
