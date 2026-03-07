import { Injectable } from '@angular/core';
import { CategoryFilter } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})

export class CategoryFilterService {
  selectedCategory: CategoryFilter = 'All';

  setCategory(category: CategoryFilter): void {
    this.selectedCategory = category;
  }
}
