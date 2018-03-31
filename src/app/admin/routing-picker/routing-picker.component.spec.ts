import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPickerComponent } from './routing-picker.component';

describe('RoutingPickerComponent', () => {
  let component: RoutingPickerComponent;
  let fixture: ComponentFixture<RoutingPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
