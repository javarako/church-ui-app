import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAssignmentComponent } from './budget-assignment.component';

describe('BudgetAssignmentComponent', () => {
  let component: BudgetAssignmentComponent;
  let fixture: ComponentFixture<BudgetAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
