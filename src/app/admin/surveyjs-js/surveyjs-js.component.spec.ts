import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyjsJsComponent } from './surveyjs-js.component';

describe('SurveyjsJsComponent', () => {
  let component: SurveyjsJsComponent;
  let fixture: ComponentFixture<SurveyjsJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyjsJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyjsJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
