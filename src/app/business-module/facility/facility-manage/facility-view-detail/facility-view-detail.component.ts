import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NzI18nService} from 'ng-zorro-antd';
import {FacilityForCommonService} from '../../../../core-module/api-service/facility';
import {FacilityLanguageInterface} from '../../../../../assets/i18n/facility/facility.language.interface';
import {ViewDetailCodeModel} from '../../../../core-module/model/facility/view-detail-code.model';
import {ResultModel} from '../../../../shared-module/model/result.model';
import {ObjectTypeEnum} from '../../../../core-module/enum/facility/object-type.enum';
import {LanguageEnum} from '../../../../shared-module/enum/language.enum';
import {SessionUtil} from '../../../../shared-module/util/session-util';
import {DeviceTypeEnum} from '../../../../core-module/enum/facility/facility.enum';
import {DynamicDetailCardEnum} from '../../../../core-module/enum/equipment/equipment.enum';

/**
 * 设施详情组件
 */
@Component({
  selector: 'app-facility-view-detail',
  templateUrl: './facility-view-detail.component.html',
  styleUrls: ['./facility-view-detail.component.scss']
})
export class FacilityViewDetailComponent implements OnInit {
  // 设施id
  public deviceId: string;
  // 序列号
  public serialNum: string;
  // 设施详情code
  public detailCode: string[];
  // 设施类型
  public deviceType: DeviceTypeEnum;
  // 设施名称
  public deviceName: string;
  // 位置
  public positionBase: string;
  // 设施语音包
  public language: FacilityLanguageInterface;
  // 设施类型
  public facilityType = ObjectTypeEnum.facility;
  // 设施详情版块显示隐藏
  public detailCodeShow = {
    // 基础信息
    infrastructureDetails: false,
    // 是否有锁
    hasGuard: false,
    // 基本操作
    basicOperation: false,
    // 智能标签
    intelligentLabelDetail: false,
    // 设施告警
    facilityAlarm: false,
    // 设施工单
    facilityWorkOrder: false,
    // 设施图标
    facilityImgView: false,
    // 挂在设备
    mountEquipment: false,
    // 设备日志
    equipmentLog: false,
    // 操作日志
    operationLog: false
  };

  constructor(private $active: ActivatedRoute,
              private $i18n: NzI18nService,
              private $facilityCommonService: FacilityForCommonService) {
  }

  ngOnInit() {
    this.language = this.$i18n.getLocaleData(LanguageEnum.facility);
    this.$active.queryParams.subscribe(params => {
      this.deviceId = params.id;
      this.deviceType = params.deviceType;
      this.serialNum = params.serialNum;
      this.deviceName = params.deviceName;
      this.positionBase = params.positionBase;
      // 获取 详情页面模块id
      this.$facilityCommonService.getDeviceDetailCode({deviceType: this.deviceType, deviceId: this.deviceId})
        .subscribe((result: ResultModel<ViewDetailCodeModel[]>) => {
          const data = result.data || [];
          this.detailCode = data.map(item => item.id);
          this.convertCodeToShow(this.detailCode);
        });
    });
  }

  /**
   * 转换code码 为显示隐藏
   * param {string[]} code
   */
  convertCodeToShow(code: string[]) {
    this.detailCodeShow = {
      basicOperation: code.includes(DynamicDetailCardEnum.operate),
      infrastructureDetails: code.includes(DynamicDetailCardEnum.detail),
      hasGuard: code.includes(DynamicDetailCardEnum.intelligentEntranceGuard)
        || code.includes(DynamicDetailCardEnum.passiveLock),
      intelligentLabelDetail: code.includes(DynamicDetailCardEnum.intelligentLabelDetail) &&
        code.includes(DynamicDetailCardEnum.intelligentLabelSetting),
      facilityAlarm: code.includes(DynamicDetailCardEnum.alarm),
      facilityWorkOrder: code.includes(DynamicDetailCardEnum.equipmentOrder),
      facilityImgView: code.includes(DynamicDetailCardEnum.equipmentImg),
      mountEquipment: code.includes(DynamicDetailCardEnum.mountEquipment),
      equipmentLog: code.includes(DynamicDetailCardEnum.equipmentLog),
      operationLog: code.includes(DynamicDetailCardEnum.operateLog)
    };
  }

  /**
   * 判断是否有操作权限
   */
  public checkHasRole(code: string): boolean {
    return SessionUtil.checkHasRole(code);
  }


}
