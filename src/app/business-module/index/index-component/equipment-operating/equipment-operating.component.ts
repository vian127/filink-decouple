import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ResultModel} from '../../../../shared-module/model/result.model';
import {ResultCodeEnum} from '../../../../shared-module/enum/result-code.enum';
import {IndexApiService} from '../../service/index/index-api.service';
import {EquipmentTypeEnum} from '../../../../core-module/enum/equipment/equipment.enum';
import {ControlInstructEnum} from '../../../../core-module/enum/instruct/control-instruct.enum';
import {
  IndexIlluminationOperatePermission,
  IndexInformationScreenOperatePermission
} from '../../../../core-module/enum/index-batch-operate-permission';
import {IndexLanguageInterface} from '../../../../../assets/i18n/index/index.language.interface';
import {NzI18nService} from 'ng-zorro-antd';

@Component({
  selector: 'app-equipment-operating',
  templateUrl: './equipment-operating.component.html',
  styleUrls: ['./equipment-operating.component.scss']
})
/**
 * 设备单个操作
 */
export class EquipmentOperatingComponent implements OnInit, OnDestroy {
  @Input() isData;
  /**
   * 摄像头组件值
   */
  @ViewChild('splitScreen') splitScreen;
  // 单个操作数据
  public operationData: Array<{
    componentName: string, data: {
      id: string[], equipmentType?: string,
      buttonList?: any[], sliderConfig?
    }
  }> = [];
  // 不同设备操作集
  public operationMap = new Map<string, string[]>();
  // 是否显示信息屏
  public isShowScreen: boolean = false;
  // 是否显示摄像头
  public isShowCamera: boolean = false;
  // 播放句柄
  public lRealHandle: string;
  // 信息屏权限code
  public indexInformationScreenOperatePermission = IndexInformationScreenOperatePermission;
  // 国际化
  public indexLanguage: IndexLanguageInterface;
  // 无数据
  public noData: boolean = false;

  constructor(private $nzI18n: NzI18nService,
              private $indexApiService: IndexApiService) {
    this.indexInformationScreenOperatePermission = IndexInformationScreenOperatePermission;
    this.indexLanguage = $nzI18n.getLocaleData('index');
  }

  ngOnInit() {
    // 单个操作的权限查询
    this.parseProtocol(this.isData.equipmentId, this.isData.equipmentType);
    const common = [ControlInstructEnum.turnOn,
      ControlInstructEnum.turnOff,
      'POWER_ON',
      'POWER_OFF',
    ];
    this.operationMap
      .set(EquipmentTypeEnum.gateway, [])
      .set(EquipmentTypeEnum.camera, common)
      .set(EquipmentTypeEnum.singleLightController, common.concat(ControlInstructEnum.dimming))
      .set(EquipmentTypeEnum.centralController, common.concat(ControlInstructEnum.dimming))
      .set(EquipmentTypeEnum.informationScreen, common.concat([ControlInstructEnum.dimming, ControlInstructEnum.setVolume]));


    if (this.isData.equipmentType === EquipmentTypeEnum.gateway || this.isData.equipmentType === EquipmentTypeEnum.weatherInstrument) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  /**
   * 页面销毁
   */
  public ngOnDestroy(): void {
    this.splitScreen = null;
  }

  /**
   * 获取单个操作权限
   * param id
   * param type
   */
  public parseProtocol(equipmentId: string, equipmentType: string): void {
    this.$indexApiService.parseProtocol({equipmentId: equipmentId}).subscribe((result: ResultModel<any>) => {
      if (result.code === ResultCodeEnum.success) {
        let buttonList = [];
        this.operationData = [];
        // 处理返回数据,设置设备操作
        if (result.data && result.data.hasOwnProperty('operations') && result.data.operations.length) {
          result.data.operations.forEach(item => {
            if (item.name === this.indexLanguage.programDistribution || item.name === this.indexLanguage.showPreview) {
              this.isShowScreen = true; // 信息屏
            }
            if (item.name === this.indexLanguage.cameraAssembly) {
              this.isShowCamera = true; // 摄像头
            }
            if (this.operationMap.get(equipmentType).includes(item.id)) {
              if (item.type === 'button') {
                item.showType = equipmentType;
                buttonList.push(item);
              }
              if (item.type === 'slider') {
                this.operationData.push(
                  {
                    componentName: 'slider', data: {
                      id: [this.isData.equipmentId],
                      equipmentType: equipmentType, sliderConfig: item
                    }
                  }
                );
              }
            }
          });
        }
        this.operationData.push(
          {
            componentName: 'button',
            data: {
              id: [this.isData.equipmentId],
              buttonList: buttonList
            }
          }
        );
        console.log(this.operationData);
        buttonList = [];
      }
    });
  }
}
