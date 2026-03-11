import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Navbar } from './components/navbar/navbar';
import { DeleteModal } from './components/delete-modal/delete-modal';
import { DeleteModalService } from './services/delete-modal-service';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Navbar, RouterOutlet, DeleteModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  deleteModalService = inject(DeleteModalService);

  onModalDeleteConfirm() {
    this.deleteModalService.closeConfirm(true);
  }
  onModalDeleteCancel() {
    this.deleteModalService.closeConfirm(false);
  }
}
