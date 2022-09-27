import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPubliComponent } from './edit-publi.component';

describe('EditPubliComponent', () => {
  let component: EditPubliComponent;
  let fixture: ComponentFixture<EditPubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPubliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
