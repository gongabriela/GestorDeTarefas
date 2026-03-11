import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryFilter } from '../../models/task.model';
import { CategoryFilterService } from '../../services/category-filter-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categoryFilterService = inject(CategoryFilterService);

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categoryFilterService.setCategory(select.value as CategoryFilter);
  }
}
