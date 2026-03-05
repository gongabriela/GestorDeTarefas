import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TaskService } from '../../services/task-service'; 
import { ITask } from '../../models/task.model';

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
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });


  constructor(private location: Location, private taskService: TaskService) {}

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      const novaTarefa: ITask = {
        id: Date.now(),
        title: formValues.title!, //APAGAR confirmar que isto esta certo em principios solid e clean code
        description: formValues.description || '',
        category: formValues.category as ITask['category'],
        status: formValues.status as ITask['status'],
        dueDate: new Date(formValues.dueDate!),
        createdAt: new Date()
      };
      this.taskService.addTask(novaTarefa);
      console.log('Tarefa gravada com sucesso no LocalStorage:', novaTarefa);
      this.location.back();
    }
    else
      this.taskForm.markAllAsTouched();
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
