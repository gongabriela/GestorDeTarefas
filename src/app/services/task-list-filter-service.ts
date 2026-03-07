import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskListFilterService {
  selectedFilterTaskList: string = 'All';

  setFilterTaskList(selectedFilter: string): void{
    this.selectedFilterTaskList = selectedFilter;
  }
}
