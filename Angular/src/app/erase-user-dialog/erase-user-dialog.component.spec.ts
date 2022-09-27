import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EraseUserDialogComponent } from './erase-user-dialog.component';

describe('EraseUserDialogComponent', () => {
  let component: EraseUserDialogComponent;
  let fixture: ComponentFixture<EraseUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EraseUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EraseUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
