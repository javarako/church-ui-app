import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingnumberSearchDialogComponent } from './offeringnumber-search-dialog.component';

describe('OfferingnumberSearchDialogComponent', () => {
  let component: OfferingnumberSearchDialogComponent;
  let fixture: ComponentFixture<OfferingnumberSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferingnumberSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferingnumberSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
