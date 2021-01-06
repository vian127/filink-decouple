import {ExecuteInstructionsModel} from '../../../../business-module/index/shared/model/execute-instructions.model';
import {ResultModel} from '../../../../shared-module/model/result.model';
import {ResultCodeEnum} from '../../../../shared-module/enum/result-code.enum';
import {SessionUtil} from '../../../util/session-util';
import {MapService} from '../../../../core-module/api-service/index/map';
import {FiLinkModalService} from '../../../service/filink-modal/filink-modal.service';
import {IndexLanguageInterface} from '../../../../../assets/i18n/index/index.language.interface';

export class DynamicComponentCommon {

  public indexLanguage: IndexLanguageInterface;

  constructor(public $mapService: MapService,
              public $message: FiLinkModalService) {

  }

  /**
   * 执行指令下发
   */
  public executeInstructions(body: ExecuteInstructionsModel<{}>) {
    this.$mapService.instructDistribute(body).subscribe((result: ResultModel<string>) => {
      if (result.code === ResultCodeEnum.success) {
        this.$message.success(this.indexLanguage.theInstructionIsIssuedSuccessfully);
      } else {
        this.$message.warning(result.msg);
      }
    });
  }

  /**
   * 判断是否有操作权限
   */
   checkHasRole(code: string): boolean {
    return !SessionUtil.checkHasRole(code);
  }
}
