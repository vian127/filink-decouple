import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IndexApiInterface} from './index-api.interface';
import {ALARM_CURRENT_SERVER, DEVICE_SERVER, STRATEGY} from '../../../../core-module/api-service/api-common.config';
import {ResultModel} from '../../../../shared-module/model/result.model';
import {FacilitiesDetailsModel} from '../../../../core-module/model/index/facilities-details.model';
import {RealPictureModel} from '../../../../core-module/model/picture/real-picture.model';
import {EquipmentListModel, FacilityListModel} from '../../shared/model/facility-equipment-config.model';
import {AreaModel, GetAreaModel} from '../../shared/model/area.model';
import {GetListDeviceTypeModel, MapDeviceTypeModel, MapEquipmentTypeModel} from '../../shared/model/map-bubble.model';
import {
  EquipmentListFreeNumResultModel,
  EquipmentListResultModel,
  PicResultModel
} from '../../shared/model/facilities-card.model';
import {ViewDetailCodeModel} from '../../../../core-module/model/facility/view-detail-code.model';
import {EquipmentDetailCodeModel} from '../../../../core-module/model/equipment/equipment-detail-code.model';
import {QueryConditionModel} from '../../../../shared-module/model/query-condition.model';
import {DeviceAreaModel} from '../../shared/model/device-area.model';
import {EquipmentAreaModel} from '../../../../core-module/model/index/equipment-area.model';
import {AreaFacilityModel} from '../../shared/model/area-facility-model';
import {AlarmAreaModel} from '../../shared/model/alarm-area.model';
import {ExecuteInstructionsModel} from '../../shared/model/execute-instructions.model';
import {SelectGroupDataModel} from '../../shared/model/facility-condition.model';

/**
 * 首页服务接口实现类
 */
@Injectable(
  {providedIn: 'root'}
)
export class IndexApiService implements IndexApiInterface {
  constructor(private $http: HttpClient) {
  }

  // 查询首页全部区域
  areaListByPage(body: GetAreaModel): Observable<ResultModel<AreaModel[]>> {
    return this.$http.post<ResultModel<AreaModel[]>>(`${DEVICE_SERVER}/areaInfo/areaListByPage`, body);
  }

  // 获取设施列表
  queryDeviceList(body: QueryConditionModel): Observable<ResultModel<FacilityListModel[]>> {
    return this.$http.post<ResultModel<FacilityListModel[]>>(`${DEVICE_SERVER}/deviceInfo/queryDeviceList`, body);
  }

  // 查询设备列表
  queryEquipmentList(body: QueryConditionModel): Observable<ResultModel<EquipmentListModel[]>> {
    return this.$http.post<ResultModel<EquipmentListModel[]>>(`${DEVICE_SERVER}/equipmentInfo/queryEquipmentList`, body);
  }

  // 查询设施详情
  queryDeviceById(id: string): Observable<ResultModel<FacilitiesDetailsModel>> {
    return this.$http.get<ResultModel<FacilitiesDetailsModel>>
    (`${DEVICE_SERVER}/deviceInfo/queryDeviceInfoById/${id}`);
  }

  // 查询设备详情卡设备信息
  queryHomeEquipmentInfoById(id: string): Observable<ResultModel<FacilitiesDetailsModel>> {
    return this.$http.get<ResultModel<FacilitiesDetailsModel>>
    (`${DEVICE_SERVER}/equipmentInfo/queryHomeEquipmentInfoById/${id}`);
  }

  // 查询设施详情卡设备信息
  queryEquipmentListByDeviceId(body: EquipmentListResultModel): Observable<Object> {
    return this.$http.post(`${DEVICE_SERVER}/equipmentInfo/queryEquipmentListByDeviceId`, body);
  }

  // 查询设施详情卡设备空闲数量信息
  queryEquipmentListFreeNumByDeviceId(body: EquipmentListFreeNumResultModel): Observable<Object> {
    return this.$http.post(`${DEVICE_SERVER}/deviceInfo/queryFreeData`, body);
  }

  // 查询首页设施的区域点
  queryDevicePolymerizationList(body: DeviceAreaModel): Observable<Object> {
    return this.$http.post(`${DEVICE_SERVER}/deviceInfo/queryDeviceAreaListByMap`, body);
  }

  // 查询详情卡图片
  getPicDetail(body: PicResultModel[]): Observable<ResultModel<RealPictureModel[]>> {
    return this.$http.post<ResultModel<RealPictureModel[]>>
    (`${DEVICE_SERVER}/picRelationInfo/getPicDetail`, body);
  }

  // 添加收藏-设施
  addCollectingDeviceById(body: { deviceId: string }): Observable<ResultModel<string>> {
    return this.$http.post<ResultModel<string>>
    (`${DEVICE_SERVER}/deviceCollecting/addCollectingById`, body);
  }

  // 添加收藏-设备
  addCollectingEquipmentById(body: { equipmentId: string }): Observable<ResultModel<string>> {
    return this.$http.post<ResultModel<string>>
    (`${DEVICE_SERVER}/equipmentInfo/addCollectingById`, body);
  }

  // 取消收藏-设施
  delCollectingDeviceById(body: { deviceId: string }): Observable<ResultModel<string>> {
    return this.$http.post<ResultModel<string>>
    (`${DEVICE_SERVER}/deviceCollecting/delCollectingById`, body);
  }

  // 取消收藏-设备
  delCollectingEquipmentById(body: { equipmentId: string }): Observable<ResultModel<string>> {
    return this.$http.post<ResultModel<string>>
    (`${DEVICE_SERVER}/equipmentInfo/delCollectingById`, body);
  }
  // 根据区域id查询区域下所有设施信息
  queryDevicePolymerizations(body: AreaFacilityModel): Observable<Object> {
    return this.$http.post<ResultModel<string>>(`${DEVICE_SERVER}/deviceInfo/queryDevicePolymerizations`, body);
  }

  // 获取分组信息
  queryGroupInfoList(body: QueryConditionModel): Observable<Object> {
    return this.$http.post<ResultModel<SelectGroupDataModel[]>>(`${DEVICE_SERVER}/groupInfo/queryGroupInfoList`, body);
  }

  // 区域告警数据
  queryPolymerizationAlarmList(body: AlarmAreaModel): Observable<Object> {
    return this.$http.post<ResultModel<string>>(`${ALARM_CURRENT_SERVER}/alarmCurrent/queryPolymerizationAlarmList`, body);
  }

  // 区域设施下设备详情数据
  queryDeviceCountByMap(body: EquipmentAreaModel): Observable<Object> {
    return this.$http.post<ResultModel<any>>(`${DEVICE_SERVER}/deviceInfo/queryDeviceCountByMap`, body);
  }

  // 区域设备下设备详情数据
  queryEquipmentCountByMap(body: EquipmentAreaModel): Observable<Object> {
    return this.$http.post<ResultModel<any>>(`${DEVICE_SERVER}/equipmentInfo/queryEquipmentCountByMap`, body);
  }

  // 获取设施详情页面模块权限id
  getDeviceDetailCode(body: { deviceType: string, deviceId: string }): Observable<ResultModel<ViewDetailCodeModel[]>> {
    return this.$http.post<ResultModel<ViewDetailCodeModel[]>>(`${DEVICE_SERVER}/deviceProtocol/getDetailCode`, body);
  }

  // 获取设备详情页面模块权限id
  public getEquipmentDetailCode(body: { equipmentId: string }): Observable<ResultModel<EquipmentDetailCodeModel[]>> {
    return this.$http.post<ResultModel<EquipmentDetailCodeModel[]>>(`${DEVICE_SERVER}/equipmentProtocol/getDetailCode`, body);
  }

  // 获取全量的区域数据，包括子集
  public listAreaByAreaCodeList(body: string[]): Observable<ResultModel<AreaModel[]>> {
    return this.$http.post<ResultModel<AreaModel[]>>(`${DEVICE_SERVER}/areaInfo/listAreaByAreaCodeList/true`, body);
  }

  // 批量操作
  public instructDistribute(body: ExecuteInstructionsModel<{}>): Observable<ResultModel<any>> {
    return this.$http.post<ResultModel<any>>(`${STRATEGY}/instruct/instructDistribute`, body);
  }

  // 查询信息屏屏播放节目
  public queryProgramList(body: QueryConditionModel): Observable<ResultModel<any>> {
    return this.$http.post<ResultModel<any>>(`${STRATEGY}/program/queryProgramList`, body);
  }

  // 单个操作权限查询
  public parseProtocol(body: { equipmentId: string }): Observable<ResultModel<any>> {
    return this.$http.post<ResultModel<any>>(`${DEVICE_SERVER}/equipmentProtocol/getOperation`, body);
  }

}
