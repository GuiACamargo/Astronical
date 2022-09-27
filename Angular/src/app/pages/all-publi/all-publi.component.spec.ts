import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPubliComponent } from './all-publi.component';

describe('AllPubliComponent', () => {
  let component: AllPubliComponent;
  let fixture: ComponentFixture<AllPubliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPubliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
