import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateStore } from "@ngx-translate/core/src/translate.store";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ParentComponent } from './admin/parent/parent.component';
import { RightMenuToggleComponent } from './right-menu-toggle/right-menu-toggle.component';
import { GridListComponent } from './grid-list/grid-list.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MzTabModule } from 'ng2-materialize';
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula";
import { CreatePagesComponent } from './admin/create-pages/create-pages.component';
import { DateTimePickerModule } from 'ngx-datetime-picker';
import { SafePipe } from './admin/create-pages/safe-pipe';
import { CreatePageService } from './admin/create-pages/services/create-page.service';
import { HttpModule } from '@angular/http';
import { RenderPagesComponent } from './admin/render-pages/render-pages.component';
import { RenderPageService } from './admin/render-pages/services/render-pages-service.service';
import { LoginService } from './login/services/login.service';
import { AdminCardComponent } from './admin/admin-card/admin-card.component';
import { LoginGuard } from './admin/login/login.guard';
import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
import { RenderCardComponent } from './admin/render-card/render-card.component';
import { AdminCardService } from './admin/admin-card/services/admin-card.service';
import { DataTableModule } from 'primeng/primeng';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NodeService } from './admin/create-pages/tree/tree-service.service';
// import { TreeModule } from 'primeng/primeng';
import { TreeDemoComponent } from './admin/create-pages/tree/tree.component';
import { TreeModule } from 'angular-tree-component';
import { SurveyJsComponent } from './admin/survey-js/survey-js.component';
// import { SurveyComponent } from './survey/survey.component';
import { SurveyjsJsComponent } from './admin/surveyjs-js/surveyjs-js.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridComponent } from './admin/grid/grid.component';
import { JfSurveyEditorComponent } from './survey/survey.component';
// import { TreeModule } from 'ng2-tree';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataService } from './survey/data.service';
import { SurveyjsComponent } from './surveyjs/surveyjs.component';
import { SurveyDisplayComponent } from './survey-display/survey-display.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
export function createTranslateLoader(http: HttpClient) {


  return new TranslateHttpLoader(http, 'https://kleveron-backend.herokuapp.com/lang/', '.json');

}
@NgModule({
  declarations: [
    AppComponent,
    JfSurveyEditorComponent,
    AppComponent,
    SafePipe,
    SurveyJsComponent,
    LoginComponent,
    ParentComponent,
    RightMenuToggleComponent,
    GridListComponent,
    CreatePagesComponent,
    RenderPagesComponent,
    AdminCardComponent,
    RenderCardComponent,
    TreeDemoComponent,
    JfSurveyEditorComponent,
    SurveyjsJsComponent,
    GridComponent,
    SurveyjsComponent,
    SurveyDisplayComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([GridComponent]),
    TreeModule,
    DragulaModule,
    MzTabModule,
    DataTableModule,
    TreeModule,
    // MatCardModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DateTimePickerModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [ReactiveFormsModule, JfSurveyEditorComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DataService, NodeService, LoginGuard, TranslateService, CreatePageService, RenderPageService, LoginService, AdminCardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
