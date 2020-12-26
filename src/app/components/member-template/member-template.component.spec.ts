import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTemplateComponent } from './member-template.component';

describe('MemberTemplateComponent', () => {
  let component: MemberTemplateComponent;
  let fixture: ComponentFixture<MemberTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
