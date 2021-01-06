import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IndexLanguageInterface} from '../../../../../assets/i18n/index/index.language.interface';
import {NzI18nService} from 'ng-zorro-antd';
import {LanguageEnum} from '../../../../shared-module/enum/language.enum';
import {CommonUtil} from '../../../../shared-module/util/common-util';
import {DeviceTypeEnum} from '../../../../core-module/enum/facility/facility.enum';
import {FacilityEquipmentConfigModel} from '../../shared/model/facility-equipment-config.model';
import {
  SetEquipmentDataModel,
  SetFacilityDataModel,
  SetWorkOrderStatusDataModel
} from '../../shared/model/log-operating.model';
import * as lodash from 'lodash';
import {IndexWorkOrderStateEnum, IndexWorkOrderTypeEnum} from '../../../../core-module/enum/work-order/work-order.enum';
import {MapStoreService} from '../../../../core-module/store/map.store.service';
import {BusinessFacilityService} from '../../../../shared-module/service/business-facility/business-facility.service';
import {FilterConditionService} from '../../service/filter-condition.service';
import {EquipmentTypeEnum} from '../../../../core-module/enum/equipment/equipment.enum';
import {DeviceTabListEnum} from '../../shared/enum/index-enum';
import {WorkOrderTypeModel} from '../../shared/model/work-order-condition.model';
import {TabListTypeEnum} from '../../shared/enum/tab-list-type-enum';

/**
 * 首页左侧悬浮框tabList切换页面
 */
@Component({
  selector: 'app-tab-device',
  templateUrl: './tab-device.component.html',
  styleUrls: ['./tab-device.component.scss']
})
export class TabDeviceComponent implements OnInit, OnChanges {
  @Input() tabDeviceList: any[];
  @Input() firstClick: boolean;
  @Input() tabType: string = DeviceTabListEnum.facilityTypeTitle;
  @Input() facilityEquipmentConfig: FacilityEquipmentConfigModel;
  // 设施数据
  @Input() setFacilityData: SetFacilityDataModel[] = [];
  // 设备数据
  @Input() setEquipmentData: SetEquipmentDataModel[] = [];
  // 工单状态数据
  @Input() setWorkOrderStatusData: SetWorkOrderStatusDataModel[] = [];
  // 工单状态数据
  @Input() isRefresh;
  // 工单数据
  @Input() setWorkOrderData: WorkOrderTypeModel[];
  // 工单列表下拉选择框选择结果
  @Input() selectWorkOrderType: string;
  // 设施的选择结果
  @Output() facilitiesData = new EventEmitter<string[]>();
  // 设备的选择结果
  @Output() equipmentData = new EventEmitter<string[]>();
  // 工单类型的选择结果
  @Output() workOrderTypeData = new EventEmitter<any>();
  // 工单状态的选择结果
  @Output() workOrderStatusData = new EventEmitter<string[]>();
  // 设施设备切换显示租赁方
  @Output() facilitiesOrEquipment = new EventEmitter();
  // 国际化
  public indexLanguage: IndexLanguageInterface;
  // 设施类型是否全选
  public isFacilityTypeAllChecked: boolean = true;
  // 设备类型是否全选
  public isEquipmentTypeAllChecked: boolean = true;
  // 工单状态是否全选
  public isWorkOrderStatusAllChecked: boolean = true;
  // 工单状态枚举
  public workOrderStatusEnum = IndexWorkOrderStateEnum;
  // 默认选中的工单类型
  public orderTypeRadioValue: string = IndexWorkOrderTypeEnum.inspection;
  // 翻译工具类
  public commonUtil;
  // 设施类型枚举
  public deviceTypeEnum;
  // 国际化枚举
  public languageEnum;
  // 设备类型枚举
  public equipmentTypeEnum;
  // 工单类型暂无数据显示样式
  public workOrderTypeNoData: boolean = false;
  // 设施暂无数据显示样式
  public facilityNoData: boolean = false;
  // 设施暂无数据显示样式
  public equipmentNoData: boolean = false;
  // 工单状态暂无数据显示样式
  public workOrderStatusNoData: boolean = false;
  // 设施选择结果
  private FacilityDataList: string[] = [];
  // 设施类型全选总数
  private FacilityCheckNum: number = 0;
  // 设备选择结果
  private EquipmentDataList: string[];
  // 工单状态选择结果
  private workOrderStatusDataList: string[];
  // 工单类型选择结果
  private workOrderTypeDataList: string[];
  // 设备类型全选总数
  private EquipmentCheckNum: number = 0;
  // 工单状态全选总数
  private workOrderStatusCheckNum: number = 0;
  // change触发类型
  private changeType: number = 0;
  // 选中全部
  private allCheckData;
  // 区域缓存为空标识
  private isDataNull: string = 'noData';
  constructor(
    public $nzI18n: NzI18nService,
    private $mapStoreService: MapStoreService,
    private $businessFacilityService: BusinessFacilityService,
    private $filterConditionService: FilterConditionService) {
    this.indexLanguage = $nzI18n.getLocaleData('index');
    this.commonUtil = CommonUtil;
    this.deviceTypeEnum = DeviceTypeEnum;
    this.languageEnum = LanguageEnum;
    this.equipmentTypeEnum = EquipmentTypeEnum;
  }

  /**
   * 防抖
   */
  checkShake = lodash.debounce(() => {
    switch (this.changeType) {
      case TabListTypeEnum.FacilityType:
        if (this.FacilityDataList.length === 0) {
          this.FacilityDataList.push(this.isDataNull);
        }
        this.facilitiesData.emit(this.FacilityDataList);
        this.$mapStoreService.facilityTypeSelectedResults = this.FacilityDataList;
        this.$filterConditionService.eventEmit.emit({refresh: true});
        break;
      case TabListTypeEnum.equipmentType:
        if (this.EquipmentDataList.length === 0) {
          this.EquipmentDataList.push(this.isDataNull);
        }
        this.equipmentData.emit(this.EquipmentDataList);
        this.$mapStoreService.equipmentTypeSelectedResults = this.EquipmentDataList;
        this.$filterConditionService.eventEmit.emit({refresh: true});
        break;
      case TabListTypeEnum.workOrderStatus:
        if (this.workOrderStatusDataList.length === 0) {
          this.workOrderStatusDataList.push(this.isDataNull);
        }
        this.workOrderStatusData.emit(this.workOrderStatusDataList);
        this.$mapStoreService.workOrderStatusSelectedResults = this.workOrderStatusDataList;
        break;
      case TabListTypeEnum.workOrderType:
        if (this.workOrderTypeDataList.length === 0) {
          this.workOrderTypeDataList.push(this.isDataNull);
        }
        this.workOrderTypeData.emit(this.workOrderTypeDataList);
        this.$mapStoreService.workOrderTypeSelectedResults = this.workOrderTypeDataList;
        break;
    }
  }, 250, {leading: false, trailing: true});

  /**
   * 初始化
   */
  public ngOnInit(): void {
    this.indexLanguage = this.$nzI18n.getLocaleData(LanguageEnum.index);
  }

  /**
   * 监听输入变化
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.firstClick && this.firstClick) {
      return;
    }
    if (changes && changes.selectWorkOrderType) {
      this.orderTypeRadioValue = this.selectWorkOrderType;
    }
      if (changes.setFacilityData && changes.setFacilityData.currentValue.length) {
        // 跳过防抖
        this.facilityTypeChange(true, undefined, 1);
        this.facilityNoData = false;
      } else if (this.setFacilityData && this.setFacilityData.length === 0) {
        this.facilityNoData = true;
        this.facilitiesData.emit([this.isDataNull]);
        // 设施设备列表才会刷新地图
        if (!this.isRefresh) {
          this.$filterConditionService.eventEmit.emit({refresh: true});
        }
      }
      if (changes.setEquipmentData && changes.setEquipmentData.currentValue.length) {
        // 跳过防抖
        this.equipmentTypeChange(true, undefined, 1);
        this.equipmentNoData = false;
      } else if (this.setEquipmentData && this.setEquipmentData.length === 0) {
        this.equipmentNoData = true;
        this.equipmentData.emit([this.isDataNull]);
        // 设施设备列表才会刷新地图
        if (!this.isRefresh) {
          this.$filterConditionService.eventEmit.emit({refresh: true});
        }
      }

      if (this.setWorkOrderStatusData && this.setWorkOrderStatusData.length) {
        // 跳过防抖
        this.workOrderStatusChange(true, undefined, 1);
        this.workOrderStatusNoData = false;
      } else if (this.setWorkOrderStatusData) {
        this.workOrderStatusNoData = true;
        this.workOrderStatusData.emit([this.isDataNull]);
      }

      if (this.setWorkOrderData && this.setWorkOrderData.length) {
        // 跳过防抖
        this.workOrderTypeNoData = false;
      } else {
        this.workOrderTypeNoData = true;
      }

  }

  /**
   * 工单类型变化
   */
  public workOrderTypeChange(evt): void {
    this.workOrderTypeDataList = evt;
    this.orderTypeRadioValue = evt;
    this.changeType = TabListTypeEnum.workOrderType;
    this.checkShake();
  }

  /**
   *  工单状态checkbox全选/反选
   */
  public workOrderStatusChange(event: boolean, type?: boolean | string, change?: number): void {
    const storeData = this.$mapStoreService.workOrderStatusSelectedResults;
    this.workOrderStatusCheckNum = 0;
    // 全选和去全选或点击某个设备类型，变化总数
    this.allCheckData = this.allCheck(type, storeData, event, this.setWorkOrderStatusData, 'workOrderStatusCheckNum', 'status');
    // 读取缓存数据
    if (storeData && storeData.length && !type && change === 1) {
      this.allCheckData = this.getStoreData(storeData, type, this.setWorkOrderStatusData, 'status', 'workOrderStatusCheckNum');
    }
    const allData = this.allCheckData.facilitiesSelect;
    const checkData = this.allCheckData.setData;
    // 没有勾选的设施类型时，全选去勾选
    if (allData && checkData && allData.length !== checkData.length) {
      this.isWorkOrderStatusAllChecked = false;
    } else if (allData && checkData && allData.length === checkData.length) {
      this.isWorkOrderStatusAllChecked = true;
    }
    if (!change) {
      // 3为工单状态，当没有change启用防抖，反之直接发送事件不用防抖
      this.changeType = TabListTypeEnum.workOrderStatus;
      this.workOrderStatusDataList = this.allCheckData.facilitiesSelect;
      this.checkShake();
    } else {
      if (this.allCheckData.facilitiesSelect.length === 0) {
        this.allCheckData.facilitiesSelect.push(this.isDataNull);
      }
      this.workOrderStatusData.emit(this.allCheckData.facilitiesSelect);
      this.$mapStoreService.workOrderStatusSelectedResults = this.allCheckData.facilitiesSelect;
    }
  }

  /**
   *  设备类型checkbox全选/反选
   */
  public equipmentTypeChange(event: boolean, type?: boolean | string, change?: number): void {
    const storeData = this.$mapStoreService.equipmentTypeSelectedResults;
    this.EquipmentCheckNum = 0;
    // 全选和去全选或点击某个设备类型，变化总数
    this.allCheckData = this.allCheck(type, storeData, event, this.setEquipmentData, 'EquipmentCheckNum', 'equipmentType');
    // 读取缓存数据
    if (storeData && storeData.length && !type && change === 1) {
      this.allCheckData = this.getStoreData(storeData, type, this.setEquipmentData, 'equipmentType', 'EquipmentCheckNum');
    }
    const allData = this.allCheckData.facilitiesSelect;
    const checkData = this.allCheckData.setData;
    // 没有勾选的设施类型时，全选去勾选
    if (allData && checkData && allData.length !== checkData.length) {
      this.isEquipmentTypeAllChecked = false;
    } else if (allData && checkData && allData.length === checkData.length) {
      this.isEquipmentTypeAllChecked = true;
    }
    if (!change) {
      // 2为设备类型，当没有change启用防抖，反之直接发送事件不用防抖
      this.changeType = TabListTypeEnum.equipmentType;
      this.EquipmentDataList = this.allCheckData.facilitiesSelect;
      this.checkShake();
    } else {
      if (this.allCheckData.facilitiesSelect.length === 0) {
        this.allCheckData.facilitiesSelect.push(this.isDataNull);
      }
      this.equipmentData.emit(this.allCheckData.facilitiesSelect);
      this.$mapStoreService.equipmentTypeSelectedResults = this.allCheckData.facilitiesSelect;
    }
    this.$businessFacilityService.eventEmit.emit({type: 'equipment', data: this.allCheckData.setData});
  }

  /**
   *  设施类型checkbox全选/反选
   */
  public facilityTypeChange(event: boolean, type?: boolean | string, change?: number): void {
    const storeData = this.$mapStoreService.facilityTypeSelectedResults;
    this.FacilityCheckNum = 0;
    // 全选和去全选或点击某个设施类型，变化总数
    this.allCheckData = this.allCheck(type, storeData, event, this.setFacilityData, 'FacilityCheckNum', 'deviceType');
    // 读取缓存数据
    if (storeData && storeData.length && !type && change === 1) {
      this.allCheckData = this.getStoreData(storeData, type, this.setFacilityData, 'deviceType', 'FacilityCheckNum');
    }
    const allData = this.allCheckData.facilitiesSelect;
    const checkData = this.allCheckData.setData;
    // 没有勾选的设施类型时，全选去勾选
    if (allData && checkData && allData.length !== checkData.length) {
      this.isFacilityTypeAllChecked = false;
    } else if (allData && checkData && allData.length === checkData.length) {
      this.isFacilityTypeAllChecked = true;
    }
    if (!change) {
      // 1为设施类型，当没有change启用防抖，反之直接发送事件不用防抖
      this.changeType = TabListTypeEnum.FacilityType;
      this.FacilityDataList = this.allCheckData.facilitiesSelect;
      this.checkShake();
    } else {
      if (this.allCheckData.facilitiesSelect.length === 0) {
        this.allCheckData.facilitiesSelect.push(this.isDataNull);
      }
      this.facilitiesData.emit(this.allCheckData.facilitiesSelect);
      this.$mapStoreService.facilityTypeSelectedResults = this.allCheckData.facilitiesSelect;
    }
    this.$businessFacilityService.eventEmit.emit({type: 'facility', data: this.allCheckData.setData});
  }

  /**
   * 全选和去全选或点击某个设施类型，变化总数
   * param type
   * param storeData
   * param event
   * param setData
   * param checkNum
   * param machineType
   */
  private allCheck(type: boolean | string, storeData: any[], event: boolean, setData, checkNum: string, machineType: string): any {
    const facilitiesSelect = [];
    this[checkNum] = 0;
    if (!type) {
      // 全选和去全选
      setData.forEach(item => {
        if (event === true) {
          item.checked = true;
          facilitiesSelect.push(item[machineType]);
          this[checkNum] += item.count;
        } else {
          item.checked = false;
        }
      });
    } else if (type) {
      // 点击某个设施类型，变化总数
      setData.forEach((item) => {
        if (item.deviceType === type || item.equipmentType === type || item.status === type) {
          item.checked = event;
        }
        if (item.checked === true) {
          this[checkNum] += item.count;
          facilitiesSelect.push(item[machineType]);
        }
      });
    }
    return {
      facilitiesSelect: facilitiesSelect,
      setData: setData,
      facilityCheckNum: this[checkNum]
    };
  }

  /**
   * 读取缓存数据
   * param storeData
   * param type
   * param setData
   * param deviceType
   * param checkNum
   */
  private getStoreData(storeData: any[], type, setData, deviceType: string, checkNum: string): any {
    const facilitiesSelect = [];
    this[checkNum] = 0;
    // 缓存没有数据的情况，缓存数组里为'@@@'做区别判断
    if (storeData[0] === this.isDataNull) {
      setData.forEach(item => {
        item.checked = false;
      });
    } else {
      // 读取缓存数据
      setData.forEach(item => {
        item.checked = false;
        storeData.forEach(storeItem => {
          if (item[deviceType] === storeItem) {
            item.checked = true;
            facilitiesSelect.push(item[deviceType]);
            this[checkNum] += item.count;
          }
        });
      });
    }
    return {
      facilitiesSelect: facilitiesSelect,
      setData: setData,
      facilityCheckNum: this[checkNum]
    };
  }
}
