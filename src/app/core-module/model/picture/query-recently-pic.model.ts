/**
 *  查询最近图片查询参数模型
 */
export class QueryRecentlyPicModel {

  /**
   * 照片数量
   */
  public picNum?: string;

  /**
   *  对象id
   */
  public objectId: string;

  /**
   *  图片来源ID
   */
  public resourceId?: string;

  /**
   *  图片来源
   */
  public resource?: string;
  /**
   * 图片类型
   */
  public objectType?: string;
  constructor(objectId?: string, picNum?: string, resource?: string, resourceId?: string, objectType?: string) {
    this.objectId = objectId;
    this.picNum = picNum;
    this.resource = resource;
    this.resourceId = resourceId;
    this.objectType = objectType;
  }

}
