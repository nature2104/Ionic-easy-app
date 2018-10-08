import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectListPage } from './select-list';
import { SelectSearchListPage } from "./select-search-list"

@NgModule({
  declarations: [
    SelectListPage,
    SelectSearchListPage,
  ],
  imports: [
    IonicPageModule
  ],
  entryComponents: [
    SelectListPage,
    SelectSearchListPage
  ]

})
export class ModalModule {}
