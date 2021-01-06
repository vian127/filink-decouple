import {Component, OnInit} from '@angular/core';
import {NzI18nService} from 'ng-zorro-antd';
import {MapStoreService} from '../../../../core-module/store/map.store.service';
import {Router} from '@angular/router';
import {FacilityService} from '../../../../core-module/api-service/facility/facility-manage';
import {FiLinkModalService} from '../../../../shared-module/service/filink-modal/filink-modal.service';
import {MapCoverageService} from '../../../../shared-module/service/index/map-coverage.service';
import {MapService} from '../../../../core-module/api-service/index/map';
import {SelectGroupService} from '../../../../shared-module/service/index/select-group.service';
import {AdjustCoordinatesService} from '../../../../shared-module/service/index/adjust-coordinates.service';
import {FacilityShowService} from '../../../../shared-module/service/index/facility-show.service';
import {OtherLocationService} from '../../../../shared-module/service/index/otherLocation.service';
import {CloseShowFacilityService} from '../../../../shared-module/service/index/close-show-facility.service';
import {MapLinePointUtil} from '../../../../shared-module/util/map-line-point-util';
import {MapGroupCommonComponent} from '../../../../shared-module/component/map/map-group-common.component';
import {SelectTableEquipmentChangeService} from '../../share/service/select-table-equipment-change.service';
import {LanguageEnum} from '../../../../shared-module/enum/language.enum';
import {SessionUtil} from '../../../../shared-module/util/session-util';
import {MapConfig as BMapConfig} from '../../../../shared-module/component/map/b-map.config';
import * as _ from 'lodash';
import {IndexApiService} from '../../../index/service/index/index-api.service';
/**
 * 应用系统地图
 */
@Component({
  selector: 'application-map',
  templateUrl: '../../../../shared-module/component/map/map.component.html',
  styleUrls: ['../../../../shared-module/component/map/map.component.scss']
})
export class ApplicationMapComponent extends MapGroupCommonComponent implements OnInit {
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
              public $indexApiService: IndexApiService,
              private $selectTableEquipmentChangeService: SelectTableEquipmentChangeService,
  ) {
    super($nzI18n, $mapStoreService, $router,
      $facilityService, $modalService, $mapCoverageService,
      $indexMapService, $selectGroupService, $adjustCoordinatesService, $facilityShowService, $message, $otherLocationService, $closeShowFacilityService, $mapLinePointUtil, $indexApiService);
  }

  public ngOnInit(): void {
    // 初始化国际化
    this.indexLanguage = this.$nzI18n.getLocaleData(LanguageEnum.index);
    this.commonLanguage = this.$nzI18n.getLocaleData(LanguageEnum.common);
    this.InspectionLanguage = this.$nzI18n.getLocaleData(LanguageEnum.inspection);
    this.language = this.$nzI18n.getLocaleData(LanguageEnum.facility);
    // 语言类型
    this.typeLg = JSON.parse(localStorage.getItem('localLanguage'));
    // 告警权限查询
    this.roleAlarm = SessionUtil.checkHasRole('02');
    this.searchTypeName = this.indexLanguage.equipmentName;
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
    // 监听地图下列表勾选数据变化
    this.$selectTableEquipmentChangeService.eventEmit.subscribe((value) => {
      if ( value.type === 'equipment') {
        // 重置选中状态
        if (_.isEmpty(value.equipmentData)) {
          //  无选中数据清除地图上的点
          this.resetAllTargetMarker();
          //  无选中数据
          return;
        }
        this.targetMarkerArr = [];
        // 勾选设备列表联动地图
        this.locationByIdFromTable(value.equipmentData);
      }
    });
  }

  /**
   * 从列表勾选数据定位设备
   */
  public locationByIdFromTable(data) {
    // 多个设备勾选以第一个设备所在位置为定位中心
    const locationTarget = data[0];
    // 存储当前定位中心设施/设备ID
    this.locationId = locationTarget.equipmentId;
    // 当前为定位缩放
    this.locationType = true;
    // 清除地图数据
    if (this.mapService.mapInstance) {
      this.mapService.mapInstance.clearOverlays();
    }
    if (this.mapService.markerClusterer) {
      this.mapService.markerClusterer.clearMarkers();
    }
    const position = locationTarget.positionBase.split(',');
    const item = {lng: parseFloat(position[0]), lat: parseFloat(position[1])};
    this.mapService.setCenterAndZoom(item['lng'], item['lat'], BMapConfig.maxZoom);
    this.getWindowAreaDatalist().then((resolve: any[]) => {
      data.forEach(dataItem => {
        if (resolve.length) {
          let equipmentId;
          resolve.forEach(resItem => {
            resItem.equipmentList.forEach(_item => {
              if (_item.equipmentId === dataItem.equipmentId) {
                equipmentId = resItem.equipmentList[0].equipmentId;
              }
            });
          });
          // 多重设备选中高亮
          if (equipmentId) {
            this.selectMarkerId(equipmentId);
          }
        }
      });
    });
  }
}
