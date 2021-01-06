import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {LanguageEnum} from '../../../enum/language.enum';
import {WorkOrderLanguageInterface} from '../../../../../assets/i18n/work-order/work-order.language.interface';
import {NzI18nService} from 'ng-zorro-antd';
import {UserLanguageInterface} from '../../../../../assets/i18n/user/user-language.interface';
import {PageModel} from '../../../model/page.model';
import {TableConfigModel} from '../../../model/table-config.model';
import {QueryConditionModel, SortCondition} from '../../../model/query-condition.model';
import {ResultModel} from '../../../model/result.model';
import {ResultCodeEnum} from '../../../enum/result-code.enum';
import {UserRoleModel} from '../../../../core-module/model/user/user-role.model';
import {WorkOrderForCommonService} from '../../../../core-module/api-service/work-order';

/**
 * 责任人选择组件
 */
@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit {

  // 所选数据
  @Input() selectUserList: UserRoleModel[] = [];
  // 多选或单选
  @Input() multiple: boolean = true;
  // 显示隐藏
  @Input()
  set xcVisible(params) {
    this._xcVisible = params;
    this.xcVisibleChange.emit(this._xcVisible);
  }
  get xcVisible() {
    return this._xcVisible;
  }
  // 选中的值变化
  @Output() selectDataChange = new EventEmitter<any>();
  // 显示隐藏变化
  @Output() xcVisibleChange = new EventEmitter<boolean>();
  // 单选按钮
  @ViewChild('radioTemp') radioTemp: TemplateRef<HTMLDocument>;
  // 国际化
  public workOrderLanguage: WorkOrderLanguageInterface;
  public userLanguage: UserLanguageInterface;
  // 列表数据
  public tableDataSet: UserRoleModel[] = [];
  // 分页
  public pageBean: PageModel = new PageModel();
  // 列表配置
  public tableConfig: TableConfigModel;
  // 表格参数模型
  public queryCondition: QueryConditionModel = new QueryConditionModel();
  // 按钮
  public isFormDisabled: boolean = false;
  // 用户id
  public userId: string;
  // 显示隐藏
  private _xcVisible: boolean = false;
  // 角色下拉框数据
  private roleArray: UserRoleModel[] = [];
  // 是否清空
  private isClear: boolean = false;
  // 单位
  private deptName: string;

  constructor(
    private $nzI18n: NzI18nService,
    private $workOrderCommonService: WorkOrderForCommonService,
  ) { }

  public ngOnInit(): void {
    this.workOrderLanguage = this.$nzI18n.getLocaleData(LanguageEnum.workOrder);
    this.userLanguage = this.$nzI18n.getLocaleData(LanguageEnum.user);
    // 初始化列表配置
    this.initTableConfig();
    // 查询所有角色
    this.queryAllRoles();
    this.deptName = (JSON.parse(localStorage.getItem('userInfo'))).department.deptName;
    // 单选回显
    if (!this.multiple && this.selectUserList.length === 1) {
      this.userId = this.selectUserList[0].id;
    }
    // 查询用户列表
    this.refreshData();
  }

  /**
   * 关闭
   */
  public handleClose(): void {
    this.isClear = false;
    this.xcVisible = false;
  }

  /**
   * 确定
   */
  public selectData(): void {
    this.selectDataChange.emit(this.selectUserList);
    this.xcVisible = false;
  }
  /**
   * 单选
   */
  public onUserChange(event: string, data: UserRoleModel): void {
    this.userId = event;
    this.selectUserList = [data];
  }
  /**
   * 列表分页
   */
  public pageChange(event: PageModel): void {
    this.queryCondition.pageCondition.pageNum = event.pageIndex;
    this.queryCondition.pageCondition.pageSize = event.pageSize;
    this.refreshData();
  }

  /**
   * 查询列表
   */
  private refreshData(): void {
    this.tableConfig.isLoading = true;
    this.queryCondition.bizCondition.departmentNameList = [this.deptName];
    this.$workOrderCommonService.getDepartUserList(this.queryCondition).subscribe((res: ResultModel<UserRoleModel[]>) => {
      if (res.code === ResultCodeEnum.success) {
        this.pageBean.Total = res.totalCount;
        this.pageBean.pageIndex = res.pageNum;
        this.pageBean.pageSize = res.size;
        this.tableDataSet = res.data || [];
        const ids = this.selectUserList.map(v => v.id);
        this.tableDataSet.forEach(item => {
          if (item.role) {
            item.roleId = item.role.id;
            item.roleName = item.role.roleName;
          }
          if (item.department) {
            item.deptId = item.department.id;
            item.departmentName = item.department.deptName;
          }
          if (ids.includes(item.id)) {
            item.checked = true;
          }
        });
      }
      this.tableConfig.isLoading = false;
    }, () => {
      this.tableConfig.isLoading = false;
    });
  }
  /**
   * 初始化表格
   */
  private initTableConfig(): void {
    this.tableConfig = {
      isDraggable: true,
      isLoading: false,
      noIndex: true,
      showSearchSwitch: true,
      showRowSelection: false,
      showSizeChanger: true,
      notShowPrint: true,
      keepSelected: true,
      selectedIdKey: 'id',
      scroll: {x: '1000px', y: '600px'},
      columnConfig: [
        // 选择
        {
          type: this.multiple ? 'select' : 'render',
          renderTemplate: this.multiple ? null : this.radioTemp,
          fixedStyle: {fixedLeft: true, style: {left: '0'}}, width: 62
        },
        { //  序号
          type: 'serial-number',
          width: 62, title: '序号',
          fixedStyle: {fixedLeft: true, style: {left: '62px'}}
        },
        // 姓名
        {
          title: this.userLanguage.userName, key: 'userName', width: 150,
          searchable: true, isShowSort: true,
          searchConfig: {type: 'input'}
        },
        // 账号
        {
          title: this.userLanguage.userCode, key: 'userCode', width: 150,
          searchable: true, isShowSort: true,
          searchConfig: {type: 'input'},
          fixedStyle: {fixedLeft: true, style: {left: '124px'}}
        },
        // 昵称
        {
          title: this.userLanguage.userNickname, key: 'userNickname', width: 150,
          searchable: true, isShowSort: true,
          searchConfig: {type: 'input'}
        },
        // 角色
        {
          title: this.userLanguage.role, key: 'roleName', width: 150,
          searchable: true, isShowSort: true,
          searchKey: 'roleNameList',
          searchConfig: {
            type: 'select', selectType: 'multiple',
            selectInfo: this.roleArray
          }
        },
        // 单位/部门
        {
          title: this.userLanguage.unit, key: 'departmentName', width: 200,
          /*searchKey: 'departmentNameList',
          searchable: true,
          searchConfig: {type: 'input'},*/
        },
        {// 操作
          title: this.userLanguage.operate, searchable: true,
          searchConfig: {type: 'operate'}, key: '', width: 100, fixedStyle: {fixedRight: true, style: {right: '0px'}}
        },
      ],
      showPagination: true,
      bordered: false,
      showSearch: false,
      searchReturnType: 'object',
      topButtons: [],
      operation: [],
      sort: (event: SortCondition) => {
        this.queryCondition.sortCondition = event;
        this.refreshData();
      },
      handleSearch: (event) => {
        this.queryCondition.pageCondition.pageNum = 1;
        this.queryCondition.bizCondition = event;
        this.refreshData();
      },
      handleSelect: (event: UserRoleModel[]) => {
        this.selectUserList = [];
        if (event && event.length > 0) {
          this.selectUserList = event.map(v => {
            return {id: v.id, userName: v.userName};
          });
        }
      }
    };
  }

  /**
   * 查询角色
   */
  private queryAllRoles(): void {
    this.$workOrderCommonService.queryUserRoles().subscribe((res: ResultModel<UserRoleModel[]>) => {
      const roleArr = res.data;
      if (roleArr) {
        roleArr.forEach(item => {
          this.roleArray.push({'label': item.roleName, 'value': item.roleName});
        });
      }
    });
  }
}
