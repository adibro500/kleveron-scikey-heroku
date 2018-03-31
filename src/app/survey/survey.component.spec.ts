import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JfSurveyEditorComponent } from './survey.component';

describe('SurveyComponent', () => {
  let component: JfSurveyEditorComponent;
  let fixture: ComponentFixture<JfSurveyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JfSurveyEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JfSurveyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
