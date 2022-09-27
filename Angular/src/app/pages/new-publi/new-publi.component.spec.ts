import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPubliComponent } from './new-publi.component';

describe('NewPubliComponent', () => {
  let component: NewPubliComponent;
  let fixture: ComponentFixture<NewPubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPubliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
