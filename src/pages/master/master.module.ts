import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import {MasterPage} from "./master";

@NgModule({
  declarations: [
    MasterPage
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    MasterPage
  ]
})
export class MasterModule {}
