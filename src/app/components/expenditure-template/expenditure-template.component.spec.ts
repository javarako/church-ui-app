import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureTemplateComponent } from './expenditure-template.component';

describe('ExpenditureTemplateComponent', () => {
  let component: ExpenditureTemplateComponent;
  let fixture: ComponentFixture<ExpenditureTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenditureTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
