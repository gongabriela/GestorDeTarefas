import { Component, OnInit } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../services/task-service';
import { CategoryFilterService } from '../../services/category-filter-service';
import { TaskListFilterService } from '../../services/task-list-filter-service';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  tasks: ITask[] = [];

  constructor(
    private taskService: TaskService,
    private categoryFilterService: CategoryFilterService,
    public taskListFilterService: TaskListFilterService
  ) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  get filteredTasks(): ITask[] {
    const category = this.categoryFilterService.selectedCategory;
    if (category === 'All') return this.tasks;
    return this.tasks.filter(task => task.category === category);
  }

  get sortedTasks(): ITask[] {
    const filter = this.taskListFilterService.selectedFilterTaskList;
    if (filter === 'dueDateAsc') {
      return [...this.filteredTasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }
    if (filter === 'creationDate') {
      return [...this.filteredTasks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
    return this.filteredTasks;
  }

  get todoTasks() : ITask[] {
    return this.sortedTasks.filter(task => task.status === 'To Do');
  }

  get doingTasks() : ITask[] {
    return this.sortedTasks.filter(task => task.status === 'Doing');
  }

  get doneTasks() : ITask[] {
    return this.sortedTasks.filter(task => task.status === 'Done');
  }

  handleDeleteTask(selectedTask: ITask) {
    this.taskService.deleteTaskWithConfirmation(selectedTask)
      .subscribe(deleted => {
        if (deleted) {
          this.tasks = this.taskService.getTasks();
        }
      });
  }

  onFilterTaskList(event: Event) : void {
    const select = event.target as HTMLSelectElement;
    this.taskListFilterService.setFilterTaskList(select.value as string);
  }
}