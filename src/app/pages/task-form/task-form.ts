import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, noWhitespaceValidator]),
    description: new FormControl(''),
    category: new FormControl('Work', [Validators.required]),
    status: new FormControl('To Do', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });


  constructor(private location: Location) {}

  onCancel() {
    this.location.back();
  }
}

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
