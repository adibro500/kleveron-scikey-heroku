import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCardComponent } from './render-card.component';

describe('RenderCardComponent', () => {
  let component: RenderCardComponent;
  let fixture: ComponentFixture<RenderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
