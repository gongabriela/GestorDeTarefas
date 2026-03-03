export interface ITask {
  id: number;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Study' | 'Urgent'; // Categorias fixas para facilitar filtros
  status: 'To Do' | 'Doing' | 'Done';              // Os blocos do seu Kanban
  dueDate: Date;
  createdAt: Date;
}