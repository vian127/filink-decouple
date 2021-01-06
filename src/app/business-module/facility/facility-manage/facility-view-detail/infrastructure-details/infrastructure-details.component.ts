import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DateHelperService, NzI18nService} from 'ng-zorro-antd';
import * as _ from 'lodash';
import {FiLinkModalService} from '../../../../../shared-module/service/filink-modal/filink-modal.service';
import {FacilityApiService} from '../../../share/service/facility/facility-api.service';
import {BusinessFacilityService} from '../../../../../shared-module/service/business-facility/business-facility.service';
import {ImageViewService} from '../../../../../shared-module/service/picture-view/image-view.service';
import {FacilityService} from '../../../../../core-module/api-service/facility/facility-manage';
import {FacilityLanguageInterface} from '../../../../../../assets/i18n/facility/facility.language.interface';
import {ResultCodeEnum} from '../../../../../shared-module/enum/result-code.enum';
import {ResultModel} from '../../../../../shared-module/model/result.model';
import {LanguageEnum} from '../../../../../shared-module/enum/language.enum';
import {NO_IMG} from '../../../../../core-module/const/common.const';
import {BusinessStatusEnum} from '../../../../../core-module/enum/equipment/equipment.enum';
import {FilterCondition} from '../../../../../shared-module/model/query-condition.model';
import {OperatorEnum} from '../../../../../shared-module/enum/operator.enum';
import {Project} from '../../../share/model/project';
import {ObjectTypeEnum} from '../../../../../core-module/enum/facility/object-type.enum';
import {PicResourceEnum} from '../../../../../core-module/enum/picture/pic-resource.enum';
import {ThumbnailBaseInfoModel} from '../../../../../core-module/model/equipment/thumbnail-base-info.model';
import {FacilityDetailInfoModel} from '../../../../../core-module/model/facility/facility-detail-info.model';
import {DeployStatusEnum, DeviceStatusEnum, DeviceTypeEnum} from '../../../../../core-module/enum/facility/facility.enum';
import {CommonUtil} from '../../../../../shared-module/util/common-util';
import {FacilityForCommonService} from '../../../../../core-module/api-service/facility';
import {QueryRecentlyPicModel} from '../../../../../core-module/model/picture/query-recently-pic.model';
import {PictureListModel} from '../../../../../core-module/model/picture/picture-list.model';

declare const MAP_TYPE;

/**
 * 设施详情基础信息组件
 */
@Component({
  selector: 'app-infrastructure-details',
  templateUrl: './infrastructure-details.component.html',
  styleUrls: ['./infrastructure-details.component.scss']
})
export class InfrastructureDetailsComponent implements OnInit, OnDestroy {
  // 设施id
  @Input()
  public deviceId: string;
  // 设施类型
  @Input()
  public deviceType: DeviceTypeEnum;
  // 设施信息
  public facilityInfo: FacilityDetailInfoModel = new FacilityDetailInfoModel();
  // 无数据图标地址
  public devicePicUrl = NO_IMG;
  // 设施语言包
  public language: FacilityLanguageInterface;
  // 地图显示基本信息模型
  public baseInfo: ThumbnailBaseInfoModel;
  // 地图类型
  public mapType = MAP_TYPE;
  // 业务状态枚举
  public businessStatus = BusinessStatusEnum;
  // 是否显示分组
  public showGroupInfo = false;
  // 是否显示回路信息
  public showLoopInfo = false;
  // 是否隐藏回路分组按钮 是否显示部署状态字段 有电子锁业务的没有分组和回路 反之没有部署状态
  public hiddenLoopGroupButton: boolean = false;
  // 设施回路查询条件
  public filterConditions: FilterCondition[];
  // loading
  public loading = false;
  // 设施类型
  public deviceTypeEnum = DeviceTypeEnum;
  // 设施状态枚举
  public deviceStatusEnum = DeviceStatusEnum;
  // 语言包枚举
  public languageEnum = LanguageEnum;
  // 轮询实例
  private loopTimer: number;
  // 设施图标列表
  private devicePicList: Array<PictureListModel>;

  constructor(private $facilityService: FacilityService,
              private $facilityCommonService: FacilityForCommonService,
              private $modalService: FiLinkModalService,
              private $nzI18n: NzI18nService,
              private $dateHelper: DateHelperService,
              private $imageViewService: ImageViewService,
              private $facilityApiService: FacilityApiService,
              private $businessFacilityService: BusinessFacilityService) {
  }

  public ngOnInit(): void {
    this.language = this.$nzI18n.getLocaleData(LanguageEnum.facility);
    // 有电子锁业务的没有分组和回路
    this.hiddenLoopGroupButton = this.deviceType === DeviceTypeEnum.well
      || this.deviceType === DeviceTypeEnum.opticalBox
      || this.deviceType === DeviceTypeEnum.outdoorCabinet;
    // 获取设施详情
    this.getFacilityInfo();
    // 查询实景图
    this.getDevicePic();
    // 初始化设施设备回路查询条件
    this.filterConditions = [new FilterCondition('deviceIds', OperatorEnum.in, [this.deviceId])];
    // 订阅上传图片基本操作,用于更新图片
    this.$businessFacilityService.eventEmit.subscribe(() => {
      this.getDevicePic();
    });
  }

  /**
   * 组件销毁清除定时器
   */
  public ngOnDestroy(): void {
    if (this.loopTimer) {
      window.clearInterval(this.loopTimer);
    }
  }

  /**
   * 获取所有项目
   */
  public getProjectList(projectId: string): void {
    this.$facilityApiService.getProjectList().subscribe((result: ResultModel<Array<Project>>) => {
      if (result.code === ResultCodeEnum.success && !_.isEmpty(result.data)) {
        this.facilityInfo.projectName = _.find(result.data, (item: Project) => item.projectId === projectId).projectName;
      } else {
        this.$modalService.error(result.msg);
      }
    });
  }

  /**
   * 获取设备信息
   */
  public getFacilityInfo(): void {
    this.loading = true;
    this.$facilityCommonService.queryDeviceById({deviceId: this.deviceId})
      .subscribe((result: ResultModel<FacilityDetailInfoModel[]>) => {
        if (result.code === ResultCodeEnum.success) {
          this.loading = false;
          if (!_.isEmpty(result.data)) {
            this.facilityInfo = result.data.pop();
          }
          // 处理更新时间
          this.facilityInfo.updateTime = Date.parse(this.facilityInfo.updateTime as string);
          // 初始化缩略图基本信息
          this.baseInfo = {
            positionBase: this.facilityInfo.positionBase,
            deviceType: this.facilityInfo.deviceType,
            deviceStatus: this.facilityInfo.deviceStatus,
            areaCode: this.facilityInfo.areaInfo.areaCode,
          };
          // 翻译设施状态
          if (this.facilityInfo.deviceStatus) {
            // 设施状态icon类名
            const statusStyle = CommonUtil.getDeviceStatusIconClass(this.facilityInfo.deviceStatus);
            this.facilityInfo.deviceStatusIconClass = statusStyle.iconClass;
            // 设施状态背景类名
            this.facilityInfo.deviceStatusColorClass = statusStyle.colorClass;
            // -c后缀class类名样式为color,更换为-bg为后缀的class类名,渲染背景色
            this.facilityInfo.deviceStatusColorClass = this.facilityInfo.deviceStatusColorClass
              .replace('-c', '-bg');
          }
          if (this.facilityInfo.deployStatus) {
            this.facilityInfo.deployStatusLabel = CommonUtil.codeTranslate(DeployStatusEnum, this.$nzI18n, this.facilityInfo.deployStatus, LanguageEnum.facility) as string;
            this.facilityInfo.deployStatusIconClass = CommonUtil.getDeployStatusIconClass(this.facilityInfo.deployStatus);
          }
          // 获取所有所属项目用于转换项目名称
          if (this.facilityInfo.projectId) {
            this.getProjectList(this.facilityInfo.projectId);
          }
        } else if (result.code === ResultCodeEnum.deviceExceptionCode) {
          this.$modalService.error(result.msg);
          window.history.go(-1);
        }
        // 开启定时器轮询
        if (!this.loopTimer) {
          this.loopTimer = window.setInterval(() => {
            this.getFacilityInfo();
          }, 60000);
        }
      }, () => {
        this.loading = false;
      });
  }

  /**
   * 点击图标
   */
  public clickImage(): void {
    if (this.devicePicList && this.devicePicList.length > 0) {
      this.$imageViewService.showPictureView(this.devicePicList);
    }
  }


  /**
   * 获取设施图片
   */
  private getDevicePic(): void {
    const body: QueryRecentlyPicModel = new QueryRecentlyPicModel(this.deviceId, '1', PicResourceEnum.realPic, null, ObjectTypeEnum.facility);
    this.$facilityCommonService.getPicDetailForNew(body).subscribe((result: ResultModel<PictureListModel[]>) => {
      if (result.code === ResultCodeEnum.success && result.data && result.data.length > 0) {
        this.devicePicList = result.data;
        this.devicePicUrl = result.data[0].picUrlBase;
      }
    });
  }
}

