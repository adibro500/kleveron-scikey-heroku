import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { CreatePagesComponent } from './create-pages/create-pages.component';
import { RenderPagesComponent } from './render-pages/render-pages.component';
import { RoutingPickerComponent } from './routing-picker/routing-picker.component';
import { SurveyJsComponent } from './survey-js/survey-js.component';
import { SurveyjsJsComponent } from './surveyjs-js/surveyjs-js.component';
import { GridComponent } from './grid/grid.component';
// import { RenderCardComponent } from './render-card/render-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoutingPickerComponent]
})
export class AdminModule { }
