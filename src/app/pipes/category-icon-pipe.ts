import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIcon',
})
export class CategoryIconPipe implements PipeTransform {
  transform(category: string): string {
    switch (category.toLowerCase()) {
      case 'personal': return 'fa-user';
      case 'study': return 'fa-book-open';
      case 'work': return 'fa-briefcase';
      case 'urgent': return 'fa-bolt';
      default: return 'fa-list-check';
    }
  }
}
