import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value || typeof control.value !== 'string') {
    return null;
  }
  const isWhitespace = control.value.trim().length === 0;
  if (isWhitespace) {
    return { whitespace: true };
  }
  return null;
}