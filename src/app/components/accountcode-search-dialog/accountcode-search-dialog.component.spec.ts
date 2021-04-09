import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountcodeSearchDialogComponent } from './accountcode-search-dialog.component';

describe('AccountcodeSearchDialogComponent', () => {
  let component: AccountcodeSearchDialogComponent;
  let fixture: ComponentFixture<AccountcodeSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountcodeSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountcodeSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
