import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { ITask } from '../../models/task.model';
import { DeleteModalService } from '../../services/delete-modal-service';

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
    private location: Location,
    private deleteModalService: DeleteModalService
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
    this.location.back();
  }

  deleteTask(): void {
    if (this.task) {
      this.deleteModalService.openConfirm(this.task.title)
        .subscribe((respostaDoUtilizador: boolean) => {
          if (respostaDoUtilizador === true) {
            this.taskService.deleteTask(this.task!.id);
            this.goBack();
          }
        });
    } 
  }
}
