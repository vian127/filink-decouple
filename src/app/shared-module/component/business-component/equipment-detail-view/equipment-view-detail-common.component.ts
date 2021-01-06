import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzI18nService} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {FacilityLanguageInterface} from '../../../../../assets/i18n/facility/facility.language.interface';
import {ResultModel} from '../../../model/result.model';
import {ResultCodeEnum} from '../../../enum/result-code.enum';
import {LanguageEnum} from '../../../enum/language.enum';
import {SessionUtil} from '../../../util/session-util';
import {EquipmentAddInfoModel} from '../../../../core-module/model/equipment/equipment-add-info.model';
import {FacilityForCommonService} from '../../../../core-module/api-service/facility';
import {DynamicDetailCardEnum, EquipmentStatusEnum, EquipmentTypeEnum} from '../../../../core-module/enum/equipment/equipment.enum';
import {EquipmentDetailCodeModel} from '../../../../core-module/model/equipment/equipment-detail-code.model';


/**
 * 设备详细信息
 * created by PoHe
 */
@Component({
  selector: 'app-equipment-view-detail',
  templateUrl: './equipment-view-detail-common.component.html',
  styleUrls: ['./equipment-view-detail-common.component.scss']
})
export class EquipmentViewDetailCommonComponent implements OnInit {
  // 是否显示应用系统的操作按钮
  @Input() public isShowApplication: boolean = false;
  // 是显示自己的组件
  @Input() public isShow: boolean = false;
  @Input() public securityClass: boolean = false;
  // 设备id
  @Input() public equipmentId: string = '';
  // 设备详情里面的按钮集合
  @Input() public operationList;
  // 应用系统设备操作按钮事件
  @Output() public operationNotify = new EventEmitter();
  // 应用系统中的设备详情所需要的数据
  @Output() public equipmentDetailsNotify = new EventEmitter();
  // 设备类型
  public equipmentType: EquipmentTypeEnum;
  // 设备型号
  public equipmentModel: string = '';
  // 设备名称
  public equipmentName: string = '';
  // 设备状态
  public equipmentStatus: EquipmentStatusEnum;
  // 设备所属的设施id
  public deviceId: string;
  // 设备详情的code
  public equipmentDetailCodes: string[] = [];
  // 设备详情卡片枚举
  public equipmentDetailCardEnum = DynamicDetailCardEnum;
  // 设备管理国际化实例
  public language: FacilityLanguageInterface;

  /**
   * 构造器
   */
  constructor(
    private $nzI18n: NzI18nService,
    private $facilityForCommonService: FacilityForCommonService,
  ) {
  }

  /**
   * 组件初始化
   */
  public ngOnInit(): void {
    this.language = this.$nzI18n.getLocaleData(LanguageEnum.facility);
    // 根据设备id查询设备信息
    if (this.equipmentId) {
      this.$facilityForCommonService.getEquipmentById({equipmentId: this.equipmentId}).subscribe((res: ResultModel<EquipmentAddInfoModel[]>) => {
        if (res.code === ResultCodeEnum.success && !_.isEmpty(res.data)) {
          this.equipmentModel = res.data[0].equipmentModel;
          this.equipmentStatus = res.data[0].equipmentStatus;
          this.equipmentType = res.data[0].equipmentType;
          this.equipmentName = res.data[0].equipmentName;
          this.deviceId = res.data[0].deviceInfo.deviceId;
          // 查询设备型号的详情code便于根据code显示卡片
          this.getDetailCode();
        }
      });
    }
  }
  /**
   * 判断是否有操作权限
   */
  public checkHasRole(code: string): boolean {
    return SessionUtil.checkHasRole(code);
  }
  /**
   * 应用设备操作按钮
   * @ param data
   */
  public handleEquipmentOperation(data): void {
    this.operationNotify.emit(data);
  }

  /**
   * 应用系统设备详情中的数据
   * @ param data
   */
  public handleEquipmentDetails(data): void {
    this.equipmentDetailsNotify.emit(data);
  }

  /**
   * 根据设备型号查询动态的卡片信息
   */
  private getDetailCode(): void {
    // this.equipmentModel = 'hk120';
    this.$facilityForCommonService.getDetailCode({equipmentId: this.equipmentId}).subscribe(
      (res: ResultModel<EquipmentDetailCodeModel[]>) => {
        if (res.code === ResultCodeEnum.success) {
          this.equipmentDetailCodes = res.data.map(item => {
            return item.id;
          }) || [];
        }
      });
  }
}
