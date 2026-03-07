import { TestBed } from '@angular/core/testing';

import { TaskListFilterService } from './task-list-filter-service';

describe('TaskListFilterService', () => {
  let service: TaskListFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
