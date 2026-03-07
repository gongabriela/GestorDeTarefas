import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { ITask } from '../../models/task.model';
import { CategoryIconPipe } from '../../pipes/category-icon-pipe';
@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryIconPipe],
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
