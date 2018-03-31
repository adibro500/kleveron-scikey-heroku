import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightMenuToggleComponent } from './right-menu-toggle.component';

describe('RightMenuToggleComponent', () => {
  let component: RightMenuToggleComponent;
  let fixture: ComponentFixture<RightMenuToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightMenuToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightMenuToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
