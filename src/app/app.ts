import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITask } from './models/task.model'; // Importa a sua interface
import { TaskCard } from './components/task-card/task-card';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { KpiData } from './models/kpi-data.model';
import { KpiCard } from './components/kpi-card/kpi-card';
import { TaskService } from './services/task-service';
import { AddTaskModal } from './components/add-task-modal/add-task-modal';
``
@Component({
  selector: 'app-root',
  imports: [TaskCard, Sidebar, Navbar, KpiCard, AddTaskModal], // Mantém o RouterOutlet para as rotas futuras
  templateUrl: './app.html', // O Angular v18 usa 'app.html' em vez de 'app.component.html'
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Mantemos o signal que o Angular criou, mas com o nome do seu projeto
  //protected readonly title = signal();
   constructor(private taskService: TaskService) {};

  handleEditTask(selectedTask: ITask) {
    console.log('Tarefa editada:', selectedTask);
  }

  handleDeleteTask(selectedTask: ITask) {
    console.log('Tarefa deletada:', selectedTask);
  }

  isModalOpen = false;

  handleOpenModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // APAGAR O array com os dados que amanhã virão do LocalStorage/Service
  kpiList: KpiData[] = [
    { title: 'Total Tasks', value: 18, color: 'var(--cor-banana)' },
    { title: 'Completed', value: 12, color: 'var(--cor-verde)' },
    { title: 'In Progress', value: 2, color: 'var(--cor-azul-ceu)' },
    { title: 'Overdue', value: 4, color: 'var(--cor-rosa)' }
  ];
  tasks: ITask[] = [];

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }
}
