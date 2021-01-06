import {Injectable} from '@angular/core';
import {InspectionLanguageInterface} from '../../../../../assets/i18n/inspection-task/inspection.language.interface';
import {FiLinkModalService} from '../../../../shared-module/service/filink-modal/filink-modal.service';
import {ImageViewService} from '../../../../shared-module/service/picture-view/image-view.service';
import {ClearBarrierImagesModel} from '../model/clear-barrier-model/clear-barrier-images.model';
import {QueryImgResourceEnum, QueryImgTypeEnum} from '../enum/clear-barrier-work-order.enum';
import {ResultCodeEnum} from '../../../../shared-module/enum/result-code.enum';
import {LanguageEnum} from '../../../../shared-module/enum/language.enum';
import {NzI18nService} from 'ng-zorro-antd';
import {ClearBarrierWorkOrderService} from '../service/clear-barrier';
import {FacilityForCommonService} from '../../../../core-module/api-service/facility';
import {ResultModel} from '../../../../shared-module/model/result.model';
import {PictureListModel} from '../../../../core-module/model/picture/picture-list.model';
import {ClearBarrierWorkOrderModel} from '../../../../core-module/model/work-order/clear-barrier-work-order.model';
import {AreaModel} from '../../../../core-module/model/facility/area.model';

/**
 * 调用服务公共方法，查看图片/获取区域/判断权限
 */
@Injectable()
export class WorkOrderCommonServiceUtil {
  // 国际化
  public InspectionLanguage: InspectionLanguageInterface;
  constructor(
    private $clearBarrierWorkOrderService: ClearBarrierWorkOrderService,
    private $message: FiLinkModalService,
    private $imageViewService: ImageViewService,
    private $nzI18n: NzI18nService,
    private $facilityForCommonService: FacilityForCommonService,
  ) {
    this.InspectionLanguage = this.$nzI18n.getLocaleData(LanguageEnum.inspection);
  }
  /**
   * 查看图片
   */
  public queryImageForView(deviceId: string, procId: string): void {
    const param = new ClearBarrierImagesModel();
    param.objectId = deviceId;
    param.objectType = QueryImgTypeEnum.device;
    param.resource = QueryImgResourceEnum.order;
    param.resourceId = procId;
    this.$clearBarrierWorkOrderService.queryImages([param]).subscribe((result: ResultModel<PictureListModel[]>) => {
      if (result.code === ResultCodeEnum.success) {
        if (result.data.length === 0) {
          this.$message.warning(this.InspectionLanguage.noPicture);
        } else {
          this.$imageViewService.showPictureView(result.data);
        }
      } else {
        this.$message.error(result.msg);
      }
    });
  }

  /**
   * 获取区域
   */
  public getRoleAreaList(): Promise<AreaModel[]> {
    return new Promise((resolve, reject) => {
      this.$facilityForCommonService.queryAreaList().subscribe((result: ResultModel<AreaModel[]>) => {
        if (result.code === ResultCodeEnum.success) {
          const list = result.data || [];
          resolve(list);
        } else {
          resolve([]);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * 校验是否有权限
   */
  public queryDataRole(procId, type): Promise<boolean> {
    const param = new ClearBarrierWorkOrderModel();
    if (param.hasOwnProperty('deviceObject')) {
      delete param.deviceObject;
    }
    param.procId = procId;
    param.procType = type;
    return new Promise((resolve, reject) => {
      this.$clearBarrierWorkOrderService.checkDataRole(param).subscribe((result: ResultModel<string>) => {
        if (result.code === ResultCodeEnum.success) {
          resolve(true);
        } else {
          this.$message.error(result.msg);
          resolve(false);
        }
      }, (error) => {
        reject(error);
      });
    });
  }
}
