import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderPagesComponent } from './render-pages.component';

describe('RenderPagesComponent', () => {
  let component: RenderPagesComponent;
  let fixture: ComponentFixture<RenderPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RenderPagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
