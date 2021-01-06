import {Component, Input, OnInit} from '@angular/core';
import { FaultLanguageInterface } from '../../../../../../../assets/i18n/fault/fault-language.interface';
import {NzI18nService} from 'ng-zorro-antd';
import {FacilityService} from '../../../../../../core-module/api-service/facility/facility-manage';
import {ImageViewService} from '../../../../../../shared-module/service/picture-view/image-view.service';
import {TroubleService} from '../../../../share/service';
import {LanguageEnum} from '../../../../../../shared-module/enum/language.enum';
import {ResultModel} from '../../../../../../shared-module/model/result.model';
import {PicResourceEnum} from '../../../../../../core-module/enum/picture/pic-resource.enum';
import {ResultCodeEnum} from '../../../../../../shared-module/enum/result-code.enum';
import {FacilityForCommonService} from '../../../../../../core-module/api-service/facility/facility-for-common.service';
import {QueryRecentlyPicModel} from '../../../../../../core-module/model/picture/query-recently-pic.model';
import {PictureListModel} from '../../../../../../core-module/model/picture/picture-list.model';
/**
 * 故障图片
 */
@Component({
  selector: 'app-trouble-img-view',
  templateUrl: './trouble-img-view.component.html',
})
export class TroubleImgViewComponent implements OnInit {
  @Input() deviceId: string;
  @Input() procId: string;
  // 告警国际化引用
  public language: FaultLanguageInterface;
  // 设施图标信息
  public troublePicInfo: PictureListModel[] = [];
  constructor(
    private $nzI18n: NzI18nService,
    private $facilityService: FacilityService,
    private $imageViewService: ImageViewService,
    private $troubleService: TroubleService,
    private $facilityForCommonService: FacilityForCommonService,
  ) {
    this.language = this.$nzI18n.getLocaleData(LanguageEnum.fault);
  }

  /**
   * 初始化
   */
  public ngOnInit(): void {
    this.getDevicePic();
  }

  /**
   * 获取图片
   */
  private getDevicePic(): void {
    if (this.procId) {
      const picData: QueryRecentlyPicModel = new QueryRecentlyPicModel();
      picData.objectId = this.deviceId;
      picData.resource = PicResourceEnum.workOrder; // 来源类型
      picData.resourceId = this.procId; // 来源id
      picData.picNum = '5'; // 查询5张
      this.$facilityForCommonService.getPicDetailForNew(picData).subscribe((result: ResultModel<PictureListModel[]>) => {
        if (result.code === ResultCodeEnum.success && result.data && result.data.length > 0) {
          this.troublePicInfo = result.data;
          this.troublePicInfo.forEach((item: any) => {
            item.picSize = item.picSize ? (item.picSize / 1000).toFixed(2) + 'kb' : '';
          });
        }
      });
    }
  }
}
