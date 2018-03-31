import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDemoComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: TreeDemoComponent;
  let fixture: ComponentFixture<TreeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeDemoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
