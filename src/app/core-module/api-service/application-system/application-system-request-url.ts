import {STRATEGY, WORK_ORDER_SERVER} from '../api-common.config';

// 获取配置信息
export const SECURITY_CONFIGURATION_GET = `${STRATEGY}/cameraWorkbench/queryConfiguration`;
// 指令控制
export const CLOUD_CONTROL = `${STRATEGY}/instruct/instructDistribute`;
// 获取预置位列表
export const PRESET_LIST_GET = `${STRATEGY}/cameraWorkbench/queryPresetList`;
// 安防获取通道列表
export const SECURITY_PASSAGEWAY_LIST_GET = `${STRATEGY}/cameraWorkbench/queryChannelList`;
// 分组控制指令下发接口
export const GROUP_CONTROL = `${STRATEGY}/instruct/groupControl`;
// 设备播放的节目信息
export const CURRENT_PLAY_PROGRAM = `${STRATEGY}/equipmentData/queryEquipmentCurrentPlayProgram`;
// 工单增量统计
export const APPLY_STATISTICS = `${WORK_ORDER_SERVER}/applyStatistics/findApplyStatisticsByCondition`;
// 切换设备模式时校验
export const CHECK_POLICY = `${STRATEGY}/equipmentData/checkEquipmentModeByStrategy`;
