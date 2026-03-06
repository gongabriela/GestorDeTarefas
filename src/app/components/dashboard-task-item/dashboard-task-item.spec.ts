import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTaskItem } from './dashboard-task-item';

describe('DashboardTaskItem', () => {
  let component: DashboardTaskItem;
  let fixture: ComponentFixture<DashboardTaskItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTaskItem],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTaskItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
