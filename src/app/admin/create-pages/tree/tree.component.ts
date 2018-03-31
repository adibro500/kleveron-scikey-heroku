import { Component, OnInit, ViewChild, ViewEncapsulation, DoCheck, Directive, Input, NgModule } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeDemoComponent implements OnInit, DoCheck {


  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  public categoryNodes: any;
  public REQUEST_CONSTANTS;
  public enableLoader: boolean;
  public surveyEditorJson: any = ' ';
  public categoryName: any;
  public categoryWeightage: any;
  public disableButton: boolean = false;
  public disableContent: boolean = false;
  public categoryNodeIndex = 0;


  ngDoCheck(): void {
    // this.disableButton = false;
    // this.checkValidation(this.categoryNodes)

  }

  ngOnInit(): void {
    // this.REQUEST_CONSTANTS = this._constantsService.getRequestConstants();
    // if (this._configureAssessmentService.isActiveAssessment())
    //   this.disableContent = true
    // else
    //   this.disableContent = false
    // if (this._dataService.getData('surveyId')) {
    //   this.getAssessmentElements(this._dataService.getData('surveyId'));
    // } else {
    this.categoryNodes = [{ id: ++this.categoryNodeIndex, name: '', weightage: 0 }];
    // }

  }

  getAssessmentElements(assessmentId) {
    // this._configureAssessmentService.getAssessmentElementsAPICall(assessmentId).subscribe(response => {
    //   this.categoryNodes = JSON.parse(JSON.stringify(eval('(' + response.data[0].survey_category_json + ')')));
    //   this.surveyEditorJson = response.data[0].survey_questions_json;
    //   window.localStorage.setItem('editorJson', this.surveyEditorJson);
    //   this._dataService.setData('assessmentDetailsId', response.data[0].survey_elements_details_id);
    // }, error => {
    //   this.categoryNodeIndex = 0;
    //   this.categoryNodes = [{ id: ++this.categoryNodeIndex, name: '', weightage: 0 }];
    //   this.enableLoader = false;
    // });
  }


  addCategoryChildren(node, tree) {
    this.tree.treeModel.setFocus(true);
    if (node.data.children === undefined) {
      node.data.children = new Array();
    }
    node.data.children.push({
      "id": ++this.categoryNodeIndex,
      "name": '',
      "weightage": 0,
    });
    this.tree.treeModel.update();
    this.tree.treeModel.expandAll();
  }

  addCategory() {
    this.categoryNodes.push({ id: ++this.categoryNodeIndex, name: '', weightage: 0 });
    this.tree.treeModel.update();
  }
  deleteCategory(node, tree) {
    const parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
    _.remove(parentNode.data.children, function (child) {
      return child === node.data;
    });
    this.tree.treeModel.update();
    if (node.parent.data.children.length === 0) {
      node.parent.data.hasChildren = false;
    }
  }



  // nodes = [
  //   {
  //     id: 1,
  //     name: 'excellence',
  //     children: [
  //       { id: 2, name: 'emotional quotient' },
  //       { id: 3, name: 'intelligence quotient' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'behaviour',
  //     children: [
  //       { id: 5, name: 'good' }
  //     ]
  //   }
  // ];
  // options: ITreeOptions = {
  //   actionMapping: {
  //     mouse: {
  //       dblClick: (tree, node, $event) => {
  //         console.log(node);
  //         var person = prompt("Please enter node name:", "Skill");
  //         if (person !== null) {
  //           node.data.name = person;

  //         }
  //       }
  //     },
  //     keys: {
  //       [KEYS.ENTER]: (tree, node, $event) => {
  //         // localStorage.setItem('nodeidx', );
  //         var person = prompt("Please enter new node:", "Skill");

  //         if (node.hasChildren) {
  //           this.addNode(person);
  //         }
  //       }
  //     }
  //   },
  //   nodeHeight: 23,
  //   allowDrag: (node) => {
  //     return true;
  //   },
  //   allowDrop: (node) => {
  //     return true;
  //   }

  // }
  // newNode: string;
  // id = 8;
  // @ViewChild(TreeComponent)
  // private tree: TreeComponent;

  // addNode(person: string) {
  //   this.nodes.push({ id: this.id++, name: person, children: [] });
  //   this.tree.treeModel.update();
  // }
  saveToLocal() {
    let temp = JSON.stringify(this.categoryNodes);
    localStorage.setItem("survey_category_json", temp);
    console.log(temp);
  }

}
