/**
 * 操作日志数据模型
 */
export class OperateLogModel {
  /**
   * 日志编号(UUID)
   */
  public  logId: string;

  /**
   * 操作名称
   */
  private optName: string;

  /**
   * 数据操作类型
   */
  private dataOptType: string;

  /**
   * 操作类型
   */
  private  optType: string;

  /**
   * 危险级别
   */
  private  dangerLevel: string;

  /**
   * 操作用户权限
   */
  private  optUserRole: string;

  /**
   * 操作用户权限
   */
  private  optUserRoleName: string;


  /**
   * 操作用户编码
   */
  private  optUserCode: string;

  /**
   * 操作用户名称
   */
  private  optUserName: string;

  /**
   * 操作终端
   */
  private  optTerminal: string;

  /**
   * 操作时间
   */
  private  optTime: number;

  /**
   * 操作对象
   */
  private  optObj: string;

  /**
   * 操作对象编号
   */
  private  optObjId: string;

  /**
   * 操作结果
   */
  private  optResult: string;

  /**
   * 详细信息
   */
  private  detailInfo: string;

  /**
   * 备注
   */
  private  remark: string;

  /**
   * 创建人
   */
  private  createUser: string;

  /**
   * 创建时间
   */
  private  createTime: number;

  /**
   * 修改人
   */
  private  updateUser: string;

  /**
   * 修改时间
   */
  private  updateTime: number;
}
