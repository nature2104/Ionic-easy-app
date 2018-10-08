import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {TabsPage} from "./tabs";
import {HomePage} from "../home/home";
import {MessagePage} from "../message/message";
import {ToolsPage} from "../tools/tools"
import {MyInfoPage} from "../my-info/my-info";

@NgModule({
  declarations: [
    TabsPage,
    HomePage,
    MessagePage,
    MyInfoPage,
    ToolsPage

  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    TabsPage,
    HomePage,
    MessagePage,
    MyInfoPage,
    ToolsPage

  ]
})
export class TabsModule {
}
