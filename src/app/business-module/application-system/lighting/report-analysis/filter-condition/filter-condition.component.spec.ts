import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterConditionComponent } from './filter-condition.component';

describe('FilterConditionComponent', () => {
  let component: FilterConditionComponent;
  let fixture: ComponentFixture<FilterConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
