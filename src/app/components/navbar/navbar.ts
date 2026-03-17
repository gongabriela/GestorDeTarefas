import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CategoryFilter } from '../../models/task.model';
import { CategoryFilterService } from '../../services/category-filter-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categoryFilterService = inject(CategoryFilterService);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser$ = this.authService.currentUser$;
  isDropdownOpen = false;

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.categoryFilterService.setCategory(select.value as CategoryFilter);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.closeDropdown();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error doing logout:', error);
    }
  }
}
