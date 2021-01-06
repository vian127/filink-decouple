import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import * as lodash from 'lodash';
import {CommonUtil} from '../../util/common-util';
import {NzI18nService} from 'ng-zorro-antd';
import {IndexLanguageInterface} from '../../../../assets/i18n/index/index.language.interface';
import {CommonLanguageInterface} from '../../../../assets/i18n/common/common.language.interface';
import {Router} from '@angular/router';
import {MapConfig} from './map.config';
import {MapConfig as BMapConfig} from './b-map.config';
import {InspectionLanguageInterface} from '../../../../assets/i18n/inspection-task/inspection.language.interface';
import {FacilityLanguageInterface} from '../../../../assets/i18n/facility/facility.language.interface';
import {FacilityService} from '../../../core-module/api-service/facility/facility-manage';
import {FiLinkModalService} from '../../service/filink-modal/filink-modal.service';
import {MapStoreService} from '../../../core-module/store/map.store.service';
import {BMAP_ARROW, BMAP_DRAWING_POLYLINE, BMAP_DRAWING_RECTANGLE} from '../map-selector/map.config';
import {MapCoverageService} from '../../service/index/map-coverage.service';
import {QueryConditionModel} from '../../model/query-condition.model';
import {TableConfigModel} from '../../model/table-config.model';
import {ResultModel} from '../../model/result.model';
import {PageModel} from '../../model/page.model';
import {ResultCodeEnum} from '../../enum/result-code.enum';
import {AreaFacilityDataModel, AreaFacilityModel} from '../../../business-module/index/shared/model/area-facility-model';
import {CloseShowFacilityService} from '../../service/index/close-show-facility.service';
import {FacilityShowService} from '../../service/index/facility-show.service';
import {OtherLocationService} from '../../service/index/otherLocation.service';
import {SelectGroupService} from '../../service/index/select-group.service';
import {LanguageEnum} from '../../enum/language.enum';
import {FacilityForCommonUtil} from '../../../core-module/business-util/facility/facility-for-common.util';
import {MapService} from '../../../core-module/api-service/index/map';
import {bigIconSize} from '../../service/map-service/map.config';
import {SessionUtil} from '../../util/session-util';
import {AdjustCoordinatesService} from '../../service/index/adjust-coordinates.service';
import {MapLinePointUtil} from '../../util/map-line-point-util';
import {MapCommon} from './map-common';
import {FacilitiesDetailsModel} from '../../../core-module/model/index/facilities-details.model';
import {FilinkMapEnum, MapTypeEnum, TipWindowType} from '../../enum/filinkMap.enum';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IndexApiService} from '../../../business-module/index/service/index/index-api.service';
// 一定要声明BMap，要不然报错找不到BMap
declare let BMap: any;
declare let BMapLib: any;
declare let google: any;
declare let MarkerClusterer: any;


/**
 * 首页地图
 */
@Component({
  selector: 'xc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends MapCommon implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // 地图配置
  @Input() mapConfig: MapConfig;
  // 中心点
  @Input() centerPoint: string;
  // 其他模块跳转定位设备数据
  @Input() equipmentLocation;
  // 其他模块跳转定位设施数据
  @Input() deviceLocation;
  // 图标大小   18-24
  @Input() iconSize: string;
  //  区域数据
  @Input() areaData: any[];
  // 要渲染的地图数据
  @Input() data: [];
  // 地图显示的设备类型
  @Input() equipmentTypeArr: string[];
  // 显示加载读条
  @Output() showProgressBar = new EventEmitter();
  // 关闭加载读条
  @Output() hideProgressBar = new EventEmitter();
  // 地图事件回传
  @Output() mapEvent = new EventEmitter();

  // 设备名称模版
  @ViewChild('equipmentNameTemp') equipmentNameTemp: TemplateRef<any>;
  // 拓扑单选框
  @ViewChild('radioTemp') radioTemp: TemplateRef<any>;
  // 弹出框底部
  @ViewChild('tplFooter') public tplFooter;
  // 地图模板
  @ViewChild('map') map: ElementRef;

  // 分页参数初始化
  public pageBean: PageModel = new PageModel(10, 1, 1);
  // 传参条件
  public queryCondition: QueryConditionModel = new QueryConditionModel();
  // 国际化
  public InspectionLanguage: InspectionLanguageInterface;
  // 公共国际化
  public commonLanguage: CommonLanguageInterface;
  // 首页国际化
  public indexLanguage: IndexLanguageInterface;
  // 区域下设施数据模型
  public areaFacilityModel: AreaFacilityDataModel = new AreaFacilityDataModel;
  // 表格配置
  public equipmentTableConfig: TableConfigModel;
  // 国际化
  public language: FacilityLanguageInterface;
  // 表格配置
  public tableConfig: TableConfigModel;
  // 鼠标移上去时的提示框
  public isShowInfoWindow: boolean = false;
  // 多重设备点双击列表弹框
  public isShowTableWindow: boolean = false;
  // 区域点告警个数
  public loadingAlarm: boolean = false;
  // 区域点个数
  public loadingEquipment: boolean = false;
  // 上次创建的设施或设备点
  public lastCreatedEquipmentPoint: any[] = [];
  // 其他页面跳转开关
  public isLocation: boolean = false;
  // 绘制类型
  public drawType: string = BMAP_ARROW;
  // 上次创建的设施或设备点
  public lastCreatedPoint: any[] = [];
  // 浮窗类型
  public windowType = TipWindowType;
  // 地图设施/设备类型
  public mapTypeEnum = MapTypeEnum;
  // 地址搜索框值
  public addressInputValue: string;
  // 搜索类型名称
  public searchTypeName: string;
  // 信息框左边位置
  public infoWindowLeft = '0';
  // 信息框上边位置
  public infoWindowTop = '0';
  // 搜索框值
  public inputValue: string;
  // 下拉框
  public options: Array<FacilitiesDetailsModel> = [];
  // 地图类型
  public IndexObj = {
    facilityNameIndex: 1,
    bMapLocationSearch: -1,
    gMapLocationSearch: -1,
  };
  // 区域点和项目回调
  public areaPoint: any;
  // 目标标记点
  public targetMarker;
  // 定时器
  public timer: any;
  // 图表大小
  public _iconSize;
  // 地图方法
  public mapService;
  // 信息框
  public infoData = {
    type: '',
    data: null
  };
  // 设施marker点事件
  public fn: any;
  // 设备marker点事件
  public en: any;
  // 百度地图聚合点回调
  public cb: any;
  // 最大缩放级别
  public maxZoom: number;
  // 默认缩放级别
  public defaultZoom: number;
  // 谷歌地图地理位置搜索框
  public searchKey: string = '';
  // 地图类别id
  public mapTypeId: string;
  // 地图类型
  public mapType: string;
  // 地图区域告警
  public areaDataMap = new Map();
  // 新增弹出框显示隐藏
  public isVisible = false;
  // 光缆标题
  public title: string;
  // 多重设备列表数据
  public _dataSet = [];
  // 选中ID
  public selectedAlarmId = null;
  // 语言类型
  public typeLg: string;
  // 设备点数据集合
  public equipmentDataList;
  // 设施点数据集合
  public deviceDataList;
  // 表格数据
  public setData = [];
  // 地图分层设施类型
  public equipmentList: string[] = [];
  // 地图分层设施类型
  public deviceList: string[] = [];
  // 克隆一份地图区域数据
  public mapCloneData: any;
  // 地图绘画工具
  public mapDrawUtil: any;
  // 覆盖物集合
  public overlays = [];
  // 当前地图分层类型
  public indexType: string;
  // 多重设备列表区域下拉框
  public selectOption: Array<{ label: string, value: number }> = [];
  // 多重设备列表查询条件
  public queryConditions = [];
  // 多重设备列表查询数据
  public equipmentListData: Array<FacilitiesDetailsModel> = [];
  // 定位区域
  public locationArea: string[];
  // 定位Id
  public locationId: string;
  // 是否为定位
  public locationType: boolean = false;
  // 告警权限
  public roleAlarm: boolean = false;
  public selectGroup: boolean = false;
  public adjustCoordinates: boolean = false;
  public polylineSet: any;
  public coordinatesData = [];
  // 窗口视图的经纬度
  public points = [];
  // 区域中心点模型
  public areaCenterModel: AreaFacilityModel = new AreaFacilityModel;
  // 是否允许拖动
  public useDrag: boolean = false;
  // 上一次坐标调整后的marker数据集合
  public clearArr = [];
  // 上一次map创建的marker数据集合
  public lastArr;
  // 拖拽过的单个坐标调整marker数据集合
  public dragMarkerList = [];
  // 批量调整过的坐标调整marker数据集合
  public batchMarkerList = [];
  /**
   * 地图搜索栏防抖
   */
  queryInputName = lodash.debounce((value) => {
    this.queryDeviceByName(value);
  }, 500, {leading: false, trailing: true});


  constructor(public $nzI18n: NzI18nService,
              public $mapStoreService: MapStoreService,
              public $router: Router,
              public $facilityService: FacilityService,
              public $modalService: FiLinkModalService,
              public $mapCoverageService: MapCoverageService,
              public $indexMapService: MapService,
              public $selectGroupService: SelectGroupService,
              public $adjustCoordinatesService: AdjustCoordinatesService,
              public $facilityShowService: FacilityShowService,
              public $message: FiLinkModalService,
              public $otherLocationService: OtherLocationService,
              public $closeShowFacilityService: CloseShowFacilityService,
              public $mapLinePointUtil: MapLinePointUtil,
              public $indexApiService: IndexApiService
  ) {
    super($nzI18n, $mapStoreService, $mapCoverageService,
      $indexMapService, $selectGroupService, $adjustCoordinatesService,
      $message, $closeShowFacilityService, $mapLinePointUtil, $indexApiService);
  }

  ngOnInit() {
    // 初始化国际化
    this.indexLanguage = this.$nzI18n.getLocaleData(LanguageEnum.index);
    this.commonLanguage = this.$nzI18n.getLocaleData(LanguageEnum.common);
    this.InspectionLanguage = this.$nzI18n.getLocaleData(LanguageEnum.inspection);
    this.language = this.$nzI18n.getLocaleData(LanguageEnum.facility);
    // 语言类型
    this.typeLg = JSON.parse(localStorage.getItem('localLanguage'));
    // 告警权限查询
    this.roleAlarm = SessionUtil.checkHasRole('02');
    this.searchTypeName = this.indexLanguage.searchDeviceName;
    this.mapTypeId = 'roadmap';
    this.title = this.indexLanguage.chooseFibre;
    this.indexType = this.$mapCoverageService.showCoverage;
    // 创建设施点事件
    this.initFn();
    // 创建区域点事件
    this.initAreaPoint();
    // 创建绘画工具类
    this.changChooseUtil();
    // 创建坐标调整绘画工具类
    this.adjustCoordinatesUtil();
  }

  ngAfterViewInit(): void {
    if (!this.mapConfig) {
      // 请传入地图配置信息
      return;
    }
    if (!this.mapConfig.mapId) {
      // 请传入id
    } else {
      this.map.nativeElement.setAttribute('id', this.mapConfig.mapId);
    }
    this.mapType = this.mapConfig.mapType;
    if (this.mapType === FilinkMapEnum.google) {
      this.initGMap();
    } else if (this.mapType === FilinkMapEnum.baiDu) {
      this.initBMap();
    } else {
      // 不支持该类型地图
    }
    // 地图分层过滤设施类型
    this.indexType = this.$mapCoverageService.showCoverage;
    // 防止浏览器非正规操作：浏览器点击后退
    if (this.indexType === null) {
      this.indexType = this.mapTypeEnum.facility;
    }
    // 根据地图分层类型判断搜索栏为设施或设备
    this.$facilityShowService.subject.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value.mapShowType) {
        this.indexType = value.mapShowType;
        // 切换地图分层清空名称地址搜索栏
        this.clearSearch();
        if (this.indexType === this.mapTypeEnum.facility) {
          this.searchTypeName = this.indexLanguage.searchDeviceName;
        } else {
          this.searchTypeName = this.indexLanguage.equipmentName;
        }
        // 切换地图分层清空名称地址搜索栏
        this.clearSearch();
      }
      // 分层选择设施类型
      if (value.deviceType) {
        this.deviceList = value.deviceType;
      }
      // 分层选择设备类型
      if (value.equipmentType) {
        this.equipmentList = value.equipmentType;
      }
      // 其他页面跳转开关
      this.isLocation = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // 缩放级别大的时候，拿到缩放层级
    this.mapPositioning(changes);
    if (this.mapService && changes.iconSize && changes.iconSize.currentValue) {
      this.setIconSize(changes.iconSize.previousValue);
    }
    if (changes.areaData && changes.areaData.currentValue) {
      this.setAreaDataMap();
    }
  }

  ngOnDestroy(): void {
    if (this.mapService) {
      this.clearDeviceListData();
      if (this.mapService.mapInstance) {
        this.mapService.mapInstance.clearOverlays();
      }
      if (this.mapService.markerClusterer) {
        this.mapService.markerClusterer.clearMarkers();
      }
      this.mapService.clearMarkerMap();
      this.mapService.destroy();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }


  /**
   * marker点点击事件
   * param event
   */
  public markerClickEvent(id, data, event): void {
    // 重置之前的样式
    this.resetTargetMarker();
    this.hiddenShowTableWindow();
    this.locationId = id;
    let imgUrl;
    let _icon;
    if (data.facilityType === this.mapTypeEnum.device) {
      // 获取设施点图标
      imgUrl = CommonUtil.getFacilityIconUrl(bigIconSize, data.deviceType);
    } else if (data.facilityType === this.mapTypeEnum.equipment) {
      // 获取设备点图标
      imgUrl = CommonUtil.getEquipmentTypeIconUrl(bigIconSize, data.equipmentType, '0', data.equipmentList);
    } else {
      return;
    }
    // 切换大图标
    _icon = this.mapService.toggleBigIcon(imgUrl);
    // 替换图标
    event.target.setIcon(_icon);
    // 选中图标置顶
    event.target.setTop(true);
    // 为图标样式重置保存上一次数据
    this.targetMarker = this.mapService.getMarkerById(id);
    // 设置单个坐标点拖动
    if (this.useDrag) {
      this.targetMarker.enableDragging();
    } else {
      // 平移中心点
      this.mapService.panTo(data.lng, data.lat);
      // 发送状态打开详情卡
      // 如果为设施传送设施类型
      // 如果为设备传送设备型号
      this.mapEvent.emit({
        type: 'selected',
        id: id,
        idData: {
          deviceId: data['equipmentName'] ? null : data['deviceId'],
          equipmentId: data['equipmentName'] ? data['equipmentId'] : null,
          equipmentModel: data['equipmentModel'] ? data['equipmentModel'] : null,
          equipmentType: data['equipmentType'] ? data['equipmentType'] : null,
          name: data['equipmentName'] ? data['equipmentName'] : data['deviceName'],
        },
        facilityCode: data.equipmentModel || data.deviceType,
        facilityType: data.facilityType
      });
    }


  }

  /**
   * 区域点点击事件
   */
  public areaClickEvent(event, markers): void {
    this.areaCenterSetInformation(event);
    let facilityStoreData = [];
    let equipmentStoreData = [];
    // 缓存读取筛选条件设施类型数据
    if (this.$mapCoverageService.showCoverage === this.mapTypeEnum.facility) {
      if (this.$mapStoreService.facilityTypeSelectedResults.length) {
        this.$mapStoreService.facilityTypeSelectedResults.forEach(item => {
          this.$mapStoreService.showFacilityTypeSelectedResults.forEach(_item => {
            if (item === _item) {
              facilityStoreData.push(item);
            }
          });
        });
        if (!facilityStoreData.length) {
          facilityStoreData = ['noData'];
        }
      } else {
        facilityStoreData = this.$mapStoreService.showFacilityTypeSelectedResults;
      }
      this.areaCenterModel.filterConditions.device = facilityStoreData;
      // 获取设施区域中心点
      this.$indexMapService.queryDevicePolymerizationsPointCenter(this.areaCenterModel).subscribe((result: ResultModel<any>) => {
        if (result.code === ResultCodeEnum.success && result.data && result.data.positionCenter) {
          this.deviceDataList = result.data || [];
          const centerPoint = this.deviceDataList.positionCenter.split(',');
          this.mapService.setCenterAndZoom(centerPoint[0], centerPoint[1], BMapConfig.deviceZoom);
        }
      }, () => {
        this.$message.warning(this.indexLanguage.networkTips);
      });
    } else {
      // 缓存读取筛选条件设备类型数据
      if (this.$mapStoreService.equipmentTypeSelectedResults.length) {
        equipmentStoreData = ['noData'];
        this.$mapStoreService.equipmentTypeSelectedResults.forEach(item => {
          if (item === this.$mapStoreService.showEquipmentTypeSelectedResults[0]) {
            equipmentStoreData = [item];
          }
        });
      } else {
        equipmentStoreData = this.$mapStoreService.showEquipmentTypeSelectedResults;
      }
      this.areaCenterModel.filterConditions.equipment = equipmentStoreData ? equipmentStoreData : [];
      // 获取设备区域中心点
      this.queryEquipmentAreaCenterPoint();
    }
  }

  /**
   * 多重设备列表鼠标移入
   * param event
   * param data
   */
  public itemMouseOver(event, data): void {
    this.equipmentWindow(data);
  }

  /**
   * 多重设备列表鼠标移出
   * param event
   */
  public itemMouseOut(event): void {
    this.isShowInfoWindow = false;
  }

  /**
   * 设置iconSize
   * param previousValue
   */
  public setIconSize(previousValue): void {
    const size = this.iconSize.split('-');
    this._iconSize = this.mapService.createSize(size[0], size[1]);
    if (this.mapService && previousValue && previousValue !== this.iconSize) {
      this.mapService.changeAllIconSize(this.iconSize);
    }
  }


  /**
   * 获取窗口内的区域下设施设备点数据
   */
  public getWindowAreaDatalist() {
    if (this.$mapCoverageService.showCoverage === this.mapTypeEnum.facility) {
      return this.getMapDeviceData();
    } else {
      return this.getMapEquipmentData();
    }
  }

  /**
   * 创建设施点
   */
  public getMapDeviceData(area?) {
    this.areaFacilityModel = new AreaFacilityDataModel;
    // 获取窗口经纬度
    this.points = this.getWindowIsArea();
    const areaStoreData = this.$mapStoreService.areaSelectedResults || [];
    // 缓存读取筛选条件设施类型数据
    let facilityStoreData = [];
    if (this.$mapStoreService.facilityTypeSelectedResults.length) {
      this.$mapStoreService.facilityTypeSelectedResults.forEach(item => {
        this.$mapStoreService.showFacilityTypeSelectedResults.forEach(_item => {
          if (item === _item) {
            facilityStoreData.push(item);
          }
        });
      });
      if (!facilityStoreData.length) {
        facilityStoreData = ['noData'];
      }
    } else {
      facilityStoreData = this.$mapStoreService.showFacilityTypeSelectedResults;
    }
    this.areaFacilityModel.filterConditions.area = areaStoreData ? areaStoreData : [];
    this.areaFacilityModel.filterConditions.device = facilityStoreData;
    this.areaFacilityModel.filterConditions.group = [];
    this.areaFacilityModel.polymerizationType = '1';
    this.areaFacilityModel.points = this.points;
    return this.queryDevicePolymerizations(this.areaFacilityModel, area);
  }


  /**
   * 根据区域查设施
   */
  public queryDevicePolymerizations(areaFacility, area?) {
    return new Promise((resolve, reject) => {
      this.$indexMapService.queryDevicePolymerizations(areaFacility).subscribe((result: ResultModel<any>) => {
        if (result.code === ResultCodeEnum.success && result.data && result.data.positionCenter) {
          this.deviceDataList = result.data || [];
          // 分割坐标点字符串
          const centerPoint = this.deviceDataList.positionCenter.split(',');
          this.deviceDataList.deviceData.forEach(item => {
            const devicePoint = item.positionBase.split(',');
            item['facilityId'] = item.deviceId;
            item['lng'] = +devicePoint[0];
            item['lat'] = +devicePoint[1];
            item['cloneCode'] = item.code;
            item['code'] = null;
            item['equipmentList'] = [];
            item['facilityType'] = 'device';
            item['show'] = true;
          });
          // 清除所有点
          if (this.mapService.mapInstance) {
            this.mapService.mapInstance.clearOverlays();
          }
          if (this.mapService.markerClusterer) {
            this.mapService.markerClusterer.clearMarkers();
          }
          // 创建点
          this.lastArr = this.addMarkers(this.deviceDataList.deviceData);
          // 设施返回空数组给定位做判断
          resolve([]);
        }
      }, () => {
        this.$message.warning(this.indexLanguage.networkTips);
      });
    });
  }

  /**
   * 创建设备点
   */
  public getMapEquipmentData(area?) {
    this.areaFacilityModel = new AreaFacilityDataModel;
    // 获取窗口经纬度
    this.points = this.getWindowIsArea();
    // 缓存读取筛选条件区域数据
    const areaStoreData = this.$mapStoreService.areaSelectedResults || [];
    // 缓存读取筛选条件设备类型数据
    let equipmentStoreData;
    if (this.$mapStoreService.equipmentTypeSelectedResults.length) {
      equipmentStoreData = ['noData'];
      this.$mapStoreService.equipmentTypeSelectedResults.forEach(item => {
        if (item === this.$mapStoreService.showEquipmentTypeSelectedResults[0]) {
          equipmentStoreData = [item];
        }
      });
    } else {
      equipmentStoreData = this.$mapStoreService.showEquipmentTypeSelectedResults;
    }
    this.areaFacilityModel.polymerizationType = '1';
    this.areaFacilityModel.points = this.points;
    this.areaFacilityModel.filterConditions.area = areaStoreData ? areaStoreData : [];
    this.areaFacilityModel.filterConditions.equipment = equipmentStoreData ? equipmentStoreData : [];
    this.areaFacilityModel.filterConditions.group = [];
    return new Promise((resolve, reject) => {
      this.$indexMapService.queryEquipmentPolymerizations(this.areaFacilityModel).subscribe((result: ResultModel<any>) => {
        if (result.code === ResultCodeEnum.success && result.data && result.data.positionCenter) {
          this.equipmentDataList = result.data || [];
          const centerPoint = this.equipmentDataList.positionCenter.split(',');
          this.equipmentDataList.positionCenter.split(',');
          this.equipmentDataList.equipmentData.forEach((item, index) => {
            if (item.length > 1) {
              this.equipmentDataList.equipmentData[index] = FacilityForCommonUtil.equipmentStatusSort(item);
            }
          });
          this.equipmentDataList.equipmentData.forEach(item => {
            item.forEach((_item, index) => {
              const equipmentPoint = _item.positionBase.split(',');
              _item['facilityId'] = _item.equipmentId;
              _item['lng'] = +equipmentPoint[0];
              _item['lat'] = +equipmentPoint[1];
              _item['cloneCode'] = item.areaCode;
              _item['code'] = null;
              _item['equipmentList'] = item;
              _item['facilityType'] = 'equipment';
              if (index === 0) {
                _item['show'] = true;
              } else {
                _item['show'] = false;
              }
            });
          });
          // 把二维数组转化为一维数组
          lodash.flattenDeep(this.equipmentDataList.equipmentData).forEach(item => {
            this.$mapStoreService.mapEquipmentList.push(item);
          });
          let equipmentData = this.$mapStoreService.mapEquipmentList;
          equipmentData = lodash.uniqBy(equipmentData, 'equipmentId');
          equipmentData = lodash.uniqBy(equipmentData, 'positionBase');
          // 清除点
          if (this.mapService.mapInstance) {
            this.mapService.mapInstance.clearOverlays();
          }
          if (this.mapService.markerClusterer) {
            this.mapService.markerClusterer.clearMarkers();
          }
          // 创建点
          this.addMarkers(equipmentData);
          resolve(equipmentData);
        }
      }, () => {
        this.$message.warning(this.indexLanguage.networkTips);
      });
    });

  }

  /**
   * 获取地图中心点
   */
  public centerAndZoom(data): void {
    this.mapService.setCenterAndZoom(data.lng, data.lat, this.maxZoom);
  }

  /**
   * 地图缩小
   * 数字越小，级别越高
   */
  public zoomOut(): void {
    this.mapService.zoomIn();

  }

  /**
   * 地图放大
   * 数字越大，级别越小
   */
  public zoomIn(): void {
    this.mapService.zoomOut();
  }


  /**
   * 监听input
   */
  public onInput(value: string): void {
    const _value = value.trim();
    this.queryInputName(_value);
  }


  /**
   * 设施/设备名称模糊查询
   */
  public queryDeviceByName(value): void {
    if (value && value !== '') {
      const body = {
        filterConditions: [
          {
            filterField: 'deviceName',
            operator: 'like',
            filterValue: value
          }
        ]
      };
      if (this.indexType === this.mapTypeEnum.facility) {
        body.filterConditions[0].filterField = 'deviceName';
        this.$indexMapService.queryDeviceByName(body).subscribe((result: ResultModel<any>) => {
          result.data.forEach(item => {
            const devicePoint = item.positionBase.split(',');
            item['facilityName'] = item.deviceName;
            item['facilityId'] = item.deviceId;
            item['facilityType'] = 'device';
            item['lng'] = +devicePoint[0];
            item['lat'] = +devicePoint[1];
            item['equipmentList'] = [];
            item['type'] = 'device';
            item['code'] = null;
            item['show'] = true;
          });
          this.options = result.data;
        });
      } else {
        body.filterConditions[0].filterField = 'equipmentName';
        this.$indexMapService.queryEquipmentByName(body).subscribe((result: ResultModel<any>) => {
          result.data.forEach(item => {
            const devicePoint = item.positionBase.split(',');
            item['facilityName'] = item.equipmentName;
            item['facilityId'] = item.equipmentId;
            item['facilityType'] = 'equipment';
            item['lng'] = +devicePoint[0];
            item['lat'] = +devicePoint[1];
            item['equipmentList'] = [];
            item['type'] = 'device';
            item['code'] = null;
            item['show'] = true;
          });
          this.options = result.data;
        });
      }
    }
  }

  /**
   * 搜索input回车事件
   */
  public keyUpEvent(evt): void {
    if (evt.code === 'Enter') {
      if (!this.options.length) {
        if (this.indexType === 'facility') {
          this.$message.warning(this.indexLanguage.noFacility);
        } else {
          this.$message.warning(this.indexLanguage.noDevice);
        }
      } else {
        this.locationById(this.inputValue);
      }
    }
  }

  /**
   * 下拉框事件
   */
  public optionChange(event, id, name): void {
    if (name) {
      this.inputValue = name;
    }
    this.locationById(id);
  }

  /**
   * 定位
   */
  public location(): void {
    const key = this.searchKey.trim();
    if (!key) {
      return;
    }
    this.mapService.locationByAddress(key);
  }

  /**
   * 设置地图类型
   * terrain  roadmap  hybrid  satellite
   */
  public setMapType(type): void {
    this.mapTypeId = type;
    this.mapService.setMapTypeId(type);
  }

  /**
   * 设置地图区域数据
   */
  public setAreaDataMap(): void {
    this.areaData.forEach(item => {
      this.areaDataMap.set(item.areaId, item);
    });
  }

  // 地图上关闭右键
  public closeRightClick(): void {
    this.infoData.type = null;
  }

  /**
   * 设置地图设施点事件
   */
  public initFn(): void {
    this.fn = [
      {
        eventName: 'click',
        eventHandler: (event, m) => {
          // this.mapEvent.emit({type: 'mapBlackClick'});
          this.markerClick(event);
        }
      },
      // 地图上的设施点悬浮显示信息面板
      {
        eventName: 'onmouseover',
        eventHandler: (event, m) => {
          this.openMInfoWindow(event, m);
        }
      },
      {
        eventName: 'onmouseout',
        eventHandler: () => {
          this.hideInfoWindow();
        }
      },
      {
        eventName: 'dragend',
        eventHandler: (event) => {
          // 数组根据Id去重
          this.dragMarkerList = lodash.uniqBy(this.dragMarkerList, this.indexType === 'facility' ? 'deviceId' : 'equipmentId');
          event.currentTarget.$detail.lng = event.point.lng;
          event.currentTarget.$detail.lat = event.point.lat;
          event.currentTarget.$detail.positionBase = `${event.point.lng},${event.point.lat}`;
          this.dragMarkerList.push(event.currentTarget.$detail);
        }
      },
    ];
  }

  /**
   * 设置地图区域点/项目点
   */
  public initAreaPoint(): void {
    this.areaPoint = [
      {
        eventName: 'onmouseover',
        eventHandler: (event, markers) => {
          this.loadingAlarm = false;
          this.loadingEquipment = false;
          this.openAInfoWindow(event, markers);
        }
      },
      {
        eventName: 'onmouseout',
        eventHandler: (event) => {
          this.hideInfoWindow();
        }
      },
      {
        eventName: 'onclick',
        eventHandler: (event, markers) => {
          this.areaClickEvent(event, markers);
        }
      }
    ];
  }

  /**
   * 坐标调整事件回调
   */
  public adjustCoordinatesUtil(): void {
    this.$adjustCoordinatesService.eventEmit.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.adjustCoordinates = true;
      if (value.isShow === true) {
        this.chooseUtil('rectangle');
      }
      if (value.isShow === false) {
        this.adjustCoordinates = false;
        this.clearAll();
      }
      if (value.line === true) {
        this.chooseUtil('polyline');
        this.polylineSet = value.data;
        this.coordinatesData = value.value;
      }
      if (value.line === false) {
        this.clearAll();
      }

      if (value.isEdit === true) {
        this.editing('enable');
      }

      if (value.isEdit === false) {
        this.editing('able');
        this.polylineSet = value.data;
        this.coordinatesData = value.value;
        this.drawCoordinateAdjustment(this.overlays[0]);
      }

      if (value.isDrag === true) {
        this.useDrag = true;
      }

      if (value.isSave === true) {
        if (value.isDrags) {
          // 单个坐标调整
          this.coordinateAPI(this.dragMarkerList);
        } else {
          // 批量坐标调整
          this.polylineSet = value.data;
          this.coordinatesData = value.value;
          const body = [];
          this.coordinatesData.forEach(item => {
            body.push(CommonUtil.deepClone(item));
          });
          this.coordinateAPI(body);
        }
        this.dragMarkerList = [];
      }

      if (value.isSave === false) {
        this.adjustCoordinates = false;
        // 禁止坐标拖动
        if (this.targetMarker) {
          this.useDrag = false;
          this.targetMarker.disableDragging();
        } else {
          // 清除坐标调整
          this.clearAll();
          this.drawType = BMAP_ARROW;
          this.mapDrawUtil.close();
          this.mapDrawUtil.setDrawingMode(null);
        }
        this.dragMarkerList = [];
        this.dragEnd();
      }
    });
  }

  /**
   * 坐标调整保存接口
   * param body
   */
  coordinateAPI(body) {
    let api;
    if (this.indexType === 'facility') {
      api = this.$indexMapService.deviceUpdateCoordinates(body);
    } else {
      api = this.$indexMapService.equipmentUpdateCoordinates(body);
    }
    // 接口
    api.subscribe((result: ResultModel<any>) => {
      if (result.code === ResultCodeEnum.success) {
        this.$message.success(this.indexLanguage.adjustmentCoordinate + this.indexLanguage.success);
        this.dragEnd();
      } else {
        this.$message.error(result.msg);
      }
    });
  }

  /**
   *添加监听并获取数据
   */
  public addEventListener(): void {
    this.mapDrawUtil.setDrawingMode(null);
    // 添加鼠标绘制工具监听事件，用于获取绘制结果
    this.mapDrawUtil.addEventListener('overlaycomplete', (e) => {
      if (this.drawType !== BMAP_DRAWING_POLYLINE) {
        this.overlays.push(e.overlay);
        this.getOverlayPath();
        this.clearAll();
        this.drawType = BMAP_ARROW;
        this.mapDrawUtil.close();
        this.mapDrawUtil.setDrawingMode(null);
      } else {
        // 划线操作
        this.overlays.push(e.overlay);
        this.drawCoordinateAdjustment(e.overlay);
      }
    }, {passive: false, capture: true});
  }

  /**
   * 绘制坐标调整
   */
  public drawCoordinateAdjustment(e) {
    // 多少节线段，线段的长度
    const list = [];
    this.batchMarkerList = [];
    for (let i = 0; i < e.la.length - 1; i++) {
      list.push({
        length: this.$mapLinePointUtil.getDistance(e.la[i].lng, e.la[i].lat, e.la[i + 1].lng, e.la[i + 1].lat),
        pointOne: e.la[i],
        pointTwo: e.la[i + 1]
      });
    }
    // 不得超过20条线段
    if (list.length > 20) {
      this.$message.info(this.indexLanguage.noMoreThanLinesCanBeDrawnPleaseReselectToDraw);
      this.clearAll();
      return;
    }
    if (this.clearArr && this.clearArr.length) {
      this.clearArr.forEach(item => {
        this.mapService.mapInstance.removeOverlay(item);
      });
      this.clearArr = [];
    } else {
      this.lastArr.forEach(item => {
        this.mapService.mapInstance.removeOverlay(item);
      });
      this.lastArr = [];
    }
    if (this.polylineSet.type === '1') {
      if (this.$mapLinePointUtil.verificationLine(this.polylineSet.spacing, list, this.coordinatesData)) {
        // 单线
        this.$mapLinePointUtil.lineSegmentArrangement(this.coordinatesData, list, this.polylineSet.spacing).forEach((item, index) => {
          this.clearArr.push(this.$mapLinePointUtil.autoLinePointSingle(this.polylineSet.spacing,
            item.data, 0, list[index].pointOne, list[index].pointTwo,
            this.mapService));
        });
        this.clearArr = this.flat(this.clearArr);
        if (this.clearArr && this.clearArr.length > 0) {
          this.clearArr.forEach(item => {
            this.batchMarkerList.push(item.$detail);
          });
        }
      } else {
        this.$message.info(this.indexLanguage.adjustmentCoordinateErrorMsg);
      }
    } else {
      if (this.$mapLinePointUtil.verificationLine(this.polylineSet.spacing / 2, list, this.coordinatesData)) {
        // 双线
        this.$mapLinePointUtil.doubleLineSegmentArrangement(this.coordinatesData, list, this.polylineSet.spacing).forEach((item, index) => {
          this.clearArr.push(this.$mapLinePointUtil.autoLinePointBoth(this.polylineSet.spacing,
            item.data, this.polylineSet.width, list[index].pointOne, list[index].pointTwo, this.mapService));
        });
        this.clearArr = this.flat(this.clearArr);
        if (this.clearArr && this.clearArr.length > 0) {
          this.clearArr.forEach(item => {
            this.batchMarkerList.push(item.$detail);
          });
        }
      } else {
        this.$message.info(this.indexLanguage.adjustmentCoordinateErrorMsg);
      }
    }
  }

  /**
   * 是否可编辑
   * param state
   */
  public editing(state) {
    for (let i = 0; i < this.overlays.length; i++) {
      state === 'enable' ? this.overlays[i].enableEditing() : this.overlays[i].disableEditing();
    }
  }

  /**
   * 多维数组打平
   * param arr
   */
  public flat(arr) {
    return arr.reduce((pre, value) => {
      return Array.isArray(value) ? [...pre, ...this.flat(value)] : [...pre, value];
    }, []);
  }

}
