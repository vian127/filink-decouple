/**
 * 用户工具类
 */
export class UserForCommonUtil {
  /**
   * 递归设置部门的被选状态
   */
  public static setAreaNodesStatus(data, parentId, currentId?) {
    data.forEach(areaNode => {
      // 选中父亲
      areaNode.checked = areaNode.id === parentId;
      // 自己不让选
      areaNode.chkDisabled = areaNode.id === currentId;
      if (areaNode.childDepartmentList) {
        this.setAreaNodesStatus(areaNode.childDepartmentList, parentId, currentId);
      }
    });
  }
  /**
   * 设施授权门编号排序
   */
  public static sort(a, b) {
    return Number(a.value) - Number(b.value);
  }


  /**
   * json数组去重(多次重复只保留一个)(勾选设施列表专用)
   */
  public static unique(arr) {
    if (arr && arr.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const deviceId = arr[j].deviceId;
          const doorId = arr[j].doorId;
          if (arr[i].deviceId === deviceId && arr[i].doorId === doorId) {
            arr.splice(j, 1);
          }
        }
      }
    }
    return arr;
  }
}
