import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { TaskList } from './pages/task-list/task-list';
import { TaskForm } from './pages/task-form/task-form';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: Dashboard},
    {path: 'task-list', component: TaskList},
    {path: 'add-task', component: TaskForm},
];
