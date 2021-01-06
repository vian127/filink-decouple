import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEquipmentComponent } from './select-equipment.component';

describe('SelectEquipmentComponent', () => {
  let component: SelectEquipmentComponent;
  let fixture: ComponentFixture<SelectEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
