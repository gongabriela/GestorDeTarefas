import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  //APAGAR 1. Criamos o "megafone"
  @Output() openTaskModal = new EventEmitter<void>();

  //APAGAR 2. Criamos a função que vai apertar o gatilho do megafone
  onAddTaskClick() {
    this.openTaskModal.emit(); 
  }
}
