export interface RoleLanguageInterface {
  serialNumber: string;
  roleName: string;
  roleDesc: string;
  roleDescUnit: string;
  remark: string;
  operate: string;
  permission: string;
  operatePermission: string;
  facility: string;
  facilities: string;
  permissionAndFacility: string;
  permissionAndFacilities: string;
  roleSet: string;
  deleteHandle: string;
  update: string;
  addUser: string;
  batchDelete: string;
  defaultRoleTips: string;
  roleNameTips1: string;
  roleNameTips2: string;
  cancelText: string;
  okText: string;
  role: string;
  permissionIds: string;
  deviceTypeIds: string;
  config: {
    Optical_Box: string;
    Well: string;
    Distribution_Frame: string;
    Junction_Box: string;
    Optical_Cable: string;
    Splitting_Box: string;
  };
  roleExistTips: string;
  preview: string;
}
