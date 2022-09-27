import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliFormComponent } from './publi-form.component';

describe('PubliFormComponent', () => {
  let component: PubliFormComponent;
  let fixture: ComponentFixture<PubliFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubliFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubliFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
