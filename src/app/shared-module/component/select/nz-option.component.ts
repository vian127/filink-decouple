import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import {toBoolean} from 'ng-zorro-antd';


@Component({
  selector   : 'xc-nz-option',
  templateUrl: './nz-option.component.html'
})
export class NzOptionComponent {
  private _disabled = false;
  private _customContent = false;
  @ViewChild(TemplateRef) template: TemplateRef<void>;
  @Input() nzLabel: string;
  // tslint:disable-next-line:no-any
  @Input() nzValue: any;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzCustomContent(value: boolean) {
    this._customContent = toBoolean(value);
  }

  get nzCustomContent(): boolean {
    return this._customContent;
  }
}
