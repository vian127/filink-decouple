/**
 * 拓扑图枚举
 */
import {NzI18nService} from 'ng-zorro-antd';
import {CommonUtil} from '../../shared-module/util/common-util';

/**
 * 光缆级别
 */
export const opticCableLevel = {
  '0': '主干光缆',
  '1': '末端光缆',
  '2': '一级干线',
  '3': '二级干线',
  '4': '本地中继',
  '5': '本地核心',
  '6': '本地汇聚',
  '7': '汇接层光缆',
  '8': '联络光缆',
  '9': '局内光缆',
};
/**
 * 拓扑结构
 */
export const wiringType = {
  '0': '环形',
  '1': '非环形'
};
/**
 * 布线类型
 */
export const topology = {
  '0': '递减',
  '1': '不递减'
};

