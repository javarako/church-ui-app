import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingEntryComponent } from './offering-entry.component';

describe('OfferingEntryComponent', () => {
  let component: OfferingEntryComponent;
  let fixture: ComponentFixture<OfferingEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferingEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
