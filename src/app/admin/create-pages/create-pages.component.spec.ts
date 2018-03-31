import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePagesComponent } from './create-pages.component';

describe('CreatePagesComponent', () => {
  let component: CreatePagesComponent;
  let fixture: ComponentFixture<CreatePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
