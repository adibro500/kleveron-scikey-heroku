import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ParentComponent } from './admin/parent/parent.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { CreatePagesComponent } from './admin/create-pages/create-pages.component';
import { RenderPagesComponent } from './admin/render-pages/render-pages.component';
import { AdminCardComponent } from './admin/admin-card/admin-card.component';
import { LoginGuard } from './admin/login/login.guard';
import { RenderCardComponent } from './admin/render-card/render-card.component';
import { TreeDemoComponent } from './admin/create-pages/tree/tree.component';
import { SurveyJsComponent } from './admin/survey-js/survey-js.component';
import { JfSurveyEditorComponent } from './survey/survey.component';
import { SurveyjsJsComponent } from './admin/surveyjs-js/surveyjs-js.component';
import { GridComponent } from './admin/grid/grid.component';
import { SurveyDisplayComponent } from './survey-display/survey-display.component';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'parent', component: ParentComponent,
        children: [
            { path: 'gridList', component: GridListComponent },
            { path: 'createPage', component: CreatePagesComponent },
            { path: 'render/:id', component: RenderPagesComponent },
            { path: 'adminCard', component: AdminCardComponent },
            { path: 'renderCard/:id', component: RenderCardComponent },
            { path: 'tree', component: TreeDemoComponent },
            { path: 'survey', component: SurveyjsJsComponent },
            { path: 'grid', component: GridComponent },
            { path: 'giveSurvey', component: SurveyDisplayComponent }
        ]
    }
];