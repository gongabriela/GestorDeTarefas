import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
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
