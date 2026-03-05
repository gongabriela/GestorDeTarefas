import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  constructor(private location: Location) {}

  onCancel() {
    this.location.back();
  }
}
