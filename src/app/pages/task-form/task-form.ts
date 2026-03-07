import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TaskService } from '../../services/task-service'; 
import { ITask } from '../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, noWhitespaceValidator]),
    description: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
  });

  isEditMode = false;
  taskToEdit: ITask | null = null;
  
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() : void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.setupEditMode(Number(idParam));
    }
  }

  onCancel() : void {
    this.router.navigate(['/task-list']);
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return; 
    }
    if (this.isEditMode && this.taskToEdit) {
      this.saveEditedTask();
    } else {
      this.saveNewTask();
    }
    this.router.navigate(['/task-list']);
  }

  private saveEditedTask() {
    const formValues = this.taskForm.value;
    
    const tarefaAtualizada: ITask = {
      ...this.taskToEdit!,
      title: formValues.title!,
      description: formValues.description || '',
      category: formValues.category as ITask['category'],
      status: formValues.status as ITask['status'],
      dueDate: new Date(formValues.dueDate!),
    };
    
    this.taskService.updateTask(tarefaAtualizada);
  }

  private saveNewTask() {
    const formValues = this.taskForm.value;
    
    const novaTarefa: ITask = {
      id: Date.now(),
      title: formValues.title!, 
      description: formValues.description || '',
      category: formValues.category as ITask['category'],
      status: formValues.status as ITask['status'],
      dueDate: new Date(formValues.dueDate!),
      createdAt: new Date()
    };
    
    this.taskService.addTask(novaTarefa);
  }

  private setupEditMode(taskId: number) : void {
    this.isEditMode = true;
    this.taskToEdit = this.taskService.getTaskById(taskId) || null;
    if (this.taskToEdit) {
      this.prefillForm(this.taskToEdit);
    }
  }

  private prefillForm(task: ITask) : void {
    const dataFormatada = new Date(task.dueDate).toISOString().split('T')[0];
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      category: task.category,
      status: task.status,
      dueDate: dataFormatada
    });
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
