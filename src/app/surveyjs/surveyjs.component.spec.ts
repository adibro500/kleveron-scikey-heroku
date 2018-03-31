import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyjsComponent } from './surveyjs.component';

describe('SurveyjsComponent', () => {
  let component: SurveyjsComponent;
  let fixture: ComponentFixture<SurveyjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
