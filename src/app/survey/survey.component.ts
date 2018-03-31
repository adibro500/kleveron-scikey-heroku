import { Component, Input, Output, EventEmitter, DoCheck, ViewEncapsulation } from '@angular/core';
import * as SurveyEditor from '@jobFitment/surveyjs-editor';
import * as Survey from '@jobFitment/survey-knockout';
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jf-survey-editor',
  template: `<div id="surveyEditorContainer"></div>
  <button class="btn btn1" (click)="saveMySurvey()">Save Survey</button>`,
  styleUrls: ['./survey.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JfSurveyEditorComponent implements DoCheck {
  editor: SurveyEditor.SurveyEditor;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();
  @Input() set json(value: string) {
    const editorOptions = {
      showEmbededSurveyTab: false, showJSONEditorTab: false,
      showTestSurveyTab: false,
    };
    Survey.JsonObject.metaData.findProperty('questionbase', 'name').readOnly = true;
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
  constructor(private http: Http,
    private _dataService: DataService,
    private router: Router
  ) { }
  res: any;
  ngDoCheck() {
    localStorage.setItem('editorJson', this.editor.text);
    console.log(this.editor.text);
    this._dataService.setData('survey_questions_json', this.editor.text);
    // const elementsJson = this._dataService.getData('survey_questions_json');
    this.res = this.editor.text.replace(/([{,])(\s*)([A-Za-z0-9_\-]+?)\s*:/g, '$1"$3":');
    // this.res = JSON.stringify(this.res.trim());
    this.res = this.res.replace(/\\n/g, '');
    console.log('eeee', this.res);
  }

  saveMySurvey = () => {
    let apiheaders = new RequestOptions();
    let headers = new Headers();
    headers.append("user_code", localStorage.getItem("user_code"));
    headers.append("token", localStorage.getItem('token'));
    headers.append("orgname", "dev-futurxlabs");
    headers.append("Content-Type", "application/json");
    apiheaders.headers = headers;

    var body = {
      "survey_category_json": "[{\"id\":1,\"name\":\"Enahnce\",\"weightage\":20}]",
      "survey_editor_json": this.res
    };
    this.http.post("https://dev-futurxlabs.scikey.io/scikey/v1/assessments/" + localStorage.getItem('survey_id') + "/elements?is_resource=true", body, apiheaders).subscribe(res => {
      console.log(res);
    });

    this.router.navigate(['/parent/giveSurvey']);

  }

}
