import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {ToolsPage} from "../tools/tools";
import {MyInfoPage} from "../my-info/my-info"
import {MessagePage} from "../message/message"

@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagePage;
  tab3Root = ToolsPage;
  tab4Root = MyInfoPage;


  constructor() {

  }
}
