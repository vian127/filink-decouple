/**
 * websocket 通道唯一标识
 */
export enum ChannelCode {
  /**
   * 强制下线
   */
  forceOff = 'forceOff',
  /**
   * 删除用户
   */
  deleteUser = 'deleteUser',
  /**
   * 开销锁
   */
  unlock = 'unlock',
  /**
   * 导出
   */
  exportKey = 'export',
  /**
   * 账号已在其他设备登录
   */
  beOffline = 'beOffline',
  /**
   * 临时授权消息推送
   */
  auditTempAuth = 'auditTempAuth',
  /**
   * 工单推送
   */
  workflowBusiness = 'workflowBusiness',
  /**
   * 导出推送
   */
  importResult = 'import_result',
  /**
   * 新增设施
   */
  addDevice = 'addDevice',
  /**
   * 修改设施
   */
  updateDevice = 'updateDevice',
  /**
   * 删除设施
   */
  deleteDevice = 'deleteDevice',
  /**
   * focusDevice
   */
  focusDevice = 'focusDevice',
  /**
   * unFollowDevice
   */
  unFollowDevice = 'unFollowDevice',
  /**
   * 告警推送
   */
  alarm = 'alarm',
  /**
   *  菜单修改
   */
  menu = 'menu',
  /**
   *  重新登陆
   */
  againLogin = 'againLogin',
  /**
   *  未读消息数量
   */
  countUnRead = 'countUnRead',
  /**
   *  账号到期提醒
   */
  accountExpire = 'accountExpire',
  /**
   *  密码到期提醒
   */
  passwordExpire = 'passwordExpire',
  /**
   *  重置密码提醒
   */
  resetPassword = 'resetPassword',
  /**
   *信息发布
   */
  informationRelease = 'informationRelease',

  /**
   *  故障指派
   */
  troubleAssign = 'trouble',
  /**
   *  销障工单指派
   */
  unblockOrderAssign = 'clear_failure',
  /**
   * 巡检工单指派
   */
  inspectionAssign = 'inspection',
  /**
   * 告警远程通知
   */
  remoteNotifications = 'alarmRemoteNotifications',
  /**
   * 电子锁临时授权审核
   */
  electronicLocksCheck = 'ApplicationForProvisionalAuthority',
}
