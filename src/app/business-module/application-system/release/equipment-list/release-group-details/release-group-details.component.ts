import {Component, OnInit} from '@angular/core';
import {ApplicationInterface} from '../../../../../../assets/i18n/appliction/application.interface';
import {NzI18nService} from 'ng-zorro-antd';
import {LanguageEnum} from '../../../../../shared-module/enum/language.enum';

@Component({
  selector: 'app-release-group-details',
  templateUrl: './release-group-details.component.html',
  styleUrls: ['./release-group-details.component.scss']
})
export class ReleaseGroupDetailsComponent implements OnInit {
  // 区分照明，信息屏，安防不同的平台
  public category: string = '';
  /** 设备列表多语言*/
  public languageApplication: ApplicationInterface;

  constructor(
    private $nzI18n: NzI18nService,
  ) {
    this.languageApplication = this.$nzI18n.getLocaleData(LanguageEnum.application);
  }

  ngOnInit() {
    this.category = this.languageApplication.policyControl.information;
  }

}
