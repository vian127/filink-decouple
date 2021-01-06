import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessComponent} from './business.component';
import {SharedModule} from '../shared-module/shared-module.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './business.routes';
import {IndexMissionService} from '../core-module/mission/index.mission.service';
import {MenuModule} from './menu/menu.module';
import {BusinessWebsocketMsgService} from './business-websocket-msg.service';
import {FacilityMissionService} from '../core-module/mission/facility.mission.service';
import {MenuOpenMissionService} from '../core-module/mission/menu-open.mission';
import {ImportMissionService} from '../core-module/mission/import.mission.service';
import { MessageCountMission } from '../core-module/mission/message-count.mission';

@NgModule({
  declarations: [BusinessComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  providers: [IndexMissionService, BusinessWebsocketMsgService, ImportMissionService, FacilityMissionService, MenuOpenMissionService,
    MessageCountMission]
})
export class BusinessModule {
}
