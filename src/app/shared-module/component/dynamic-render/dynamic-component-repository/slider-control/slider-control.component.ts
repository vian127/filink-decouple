import {Component, Input, OnInit} from '@angular/core';
import {CommonLanguageInterface} from '../../../../../../assets/i18n/common/common.language.interface';
import {NzI18nService} from 'ng-zorro-antd';
import {MapService} from '../../../../../core-module/api-service/index/map';
import {ExecuteInstructionsModel} from '../../../../../business-module/index/shared/model/execute-instructions.model';
import {ResultModel} from '../../../../model/result.model';
import {ResultCodeEnum} from '../../../../enum/result-code.enum';
import {FiLinkModalService} from '../../../../service/filink-modal/filink-modal.service';
import {IndexLanguageInterface} from '../../../../../../assets/i18n/index/index.language.interface';
import {LanguageEnum} from '../../../../enum/language.enum';
import {DynamicComponentCommon} from '../dynamic-component-common';
import {EquipmentTypeEnum} from '../../../../../core-module/enum/equipment/equipment.enum';
import {
  LightTableEnum,
  ReleaseTableEnum
} from '../../../../../business-module/application-system/share/enum/auth.code.enum';

@Component({
  selector: 'app-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent extends DynamicComponentCommon implements OnInit {
  @Input()
  id;
  @Input()
  sliderConfig;
  @Input()
  equipmentType: string;
  value: number;
  // 公共模块国际化
  public commonLanguage: CommonLanguageInterface;
  // 首页国际化
  public indexLanguage: IndexLanguageInterface;
  // 操作权限
  public operateCode;

  constructor(
    private $nzI18n: NzI18nService,
    public $mapService: MapService,
    public $message: FiLinkModalService,
  ) {
    super($mapService, $message);
  }

  ngOnInit() {
    this.indexLanguage = this.$nzI18n.getLocaleData(LanguageEnum.index);
    if (this.equipmentType === 'E004') {
      if (this.sliderConfig.id === 'DIMMING') {
        this.operateCode = ReleaseTableEnum.DIMMING;
      } else if (this.sliderConfig.id === 'SET_VOLUME') {
        this.operateCode = ReleaseTableEnum.SET_VOLUME;
      }
    } else {
      this.operateCode =LightTableEnum.DIMMING;
    }
    this.$mapService.getLightnessVoice({equipmentType: this.equipmentType, equipmentId: this.id[0]})
      .subscribe((result: ResultModel<any>) => {
        if (result.code === ResultCodeEnum.success) {
          if (this.equipmentType === EquipmentTypeEnum.informationScreen) {
            if (this.sliderConfig.id === 'SET_VOLUME') {
              this.value = result.data.volume;
            } else {
              this.value = result.data.brightness;
            }
          } else {
            this.value = result.data.light;
          }
        }
      });
  }

  change(evt) {
    const body = new ExecuteInstructionsModel<{}>(
      this.sliderConfig.id,
      this.id,
      {[this.sliderConfig.paramId]: evt}
    );
    this.executeInstructions(body);
  }
}
