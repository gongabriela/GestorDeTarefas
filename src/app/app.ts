 import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ITask } from './models/task.model'; // Importa a sua interface
import { TaskCard } from './components/task-card/task-card';
import { Sidebar } from './components/sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [TaskCard, Sidebar], // Mantém o RouterOutlet para as rotas futuras
  templateUrl: './app.html', // O Angular v18 usa 'app.html' em vez de 'app.component.html'
  styleUrl: './app.css'
})
export class App {
  // Mantemos o signal que o Angular criou, mas com o nome do seu projeto
  protected readonly title = signal('TaskWave');

  handleEditTask(selectedTask: ITask) {
    console.log('Tarefa editada:', selectedTask);
  }

  handleDeleteTask(selectedTask: ITask) {
    console.log('Tarefa deletada:', selectedTask);
  }

  // Adicionamos a sua lista de tarefas (Mock Data)
  tasks: ITask[] = [
    {
      id: 1,
      title: 'Configurar Repositório',
      description: 'Lincar o projeto local ao GitHub',
      category: 'Work',
      status: 'Done',
      dueDate: new Date(),
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Desenhar Componente de Card',
      description: 'Criar o HTML/CSS do cartão de tarefa',
      category: 'Urgent',
      status: 'To Do',
      dueDate: new Date(),
      createdAt: new Date()
    }
  ];
}
