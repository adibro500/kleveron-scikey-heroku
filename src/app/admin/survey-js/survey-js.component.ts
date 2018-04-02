import { Component, Input, Output, EventEmitter, DoCheck, ViewEncapsulation } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import { OnChanges } from '@angular/core';
import * as Survey from 'survey-knockout';
declare var $: any;
declare var perfectScrollbar: any;
declare var height: any;
declare var tabs: any;
@Component({
  selector: 'app-survey-js',
  templateUrl: './survey-js.component.html',
  styleUrls: ['./survey-js.component.css']
})
export class SurveyJsComponent implements DoCheck {
  editor: SurveyEditor.SurveyEditor;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();
  @Input() set json(value: string) {
    const editorOptions = {
      showEmbededSurveyTab: false, showJSONEditorTab: false,
      showTestSurveyTab: false,
    };
    this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
    this.editor.onCanShowProperty.add(function (sender, options) {
      if (options.obj.getType() === 'survey') {
        options.canShow = false;
      }
    });
    this.editor.onCanShowProperty.add(function (sender, options) {
      if (options.obj.getType() === 'page') {
        options.canShow = options.property.name === 'name';

      }
    });
    this.editor.text = value;
    this.editor.saveSurveyFunc = this.saveMySurvey;

  }
  ngDoCheck() {
    // window.localStorage.setItem('editorJson', this.editor.text);
  }

  saveMySurvey = () => {
    this.surveySaved.emit(this.editor.text);
  }

}
