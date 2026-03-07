import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css'
})
export class TaskDetails implements OnInit {
  task?: ITask;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.task = this.taskService.getTaskById(id);
    }
  }
  //APAGAR transformar isso em pipe pq tb usamos esse mesmo codigo no task-item
  get categoryIcon(): string {
    const cat = this.task?.category.toLowerCase() || '';
    switch (cat) {
      case 'personal': return 'fa-user';
      case 'study': return 'fa-book-open';
      case 'work': return 'fa-briefcase';
      case 'urgent': return 'fa-bolt';
      default: return 'fa-list-check';
    }
  }

  goBack(): void {
    this.router.navigate(['/task-list']);
  }

  deleteTask(): void {
    if (this.task) {
      this.taskService.deleteTaskWithConfirmation(this.task)
        .subscribe(deleted => {
          if (deleted) {
            this.goBack();
          }
        });
    }
  }
}
