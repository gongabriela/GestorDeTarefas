export interface ITask {
  id: number;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Study' | 'Urgent';
  status: 'To Do' | 'Doing' | 'Done';
  dueDate: Date;
  createdAt: Date;
}

export type CategoryFilter = ITask['category'] | 'All';
