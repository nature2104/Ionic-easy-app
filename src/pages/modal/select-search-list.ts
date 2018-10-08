import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the SelectSearchListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-search-list',
  template: '<ion-header class="bar-custom">\n' +
  '  <ion-navbar>\n' +
  '    <ion-buttons start (click)="closeModal()">\n' +
  '      <button ion-button icon-only>\n' +
  '        <ion-icon name="ios-arrow-back"></ion-icon>\n' +
  '      </button>\n' +
  '    </ion-buttons>\n' +
  '    <div class="search">\n' +
  '      <img class="search-icon" src="assets/imgs/search.png">\n' +
  '      <input type="text" placeholder="请输入关键字" class="search-input" [(ngModel)]="search_key.key_word"/>\n' +
  '      <img src="assets/imgs/clear.png" class="clear-button" *ngIf="search_key.key_word" (click)="clearCondition()"/>\n' +
  '    </div>\n' +
  '    <ion-buttons end (click)="getItems()">\n' +
  '      <button ion-button>\n' +
  '        搜索\n' +
  '      </button>\n' +
  '    </ion-buttons>\n' +
  '  </ion-navbar>\n' +
  '</ion-header>\n' +
  '<ion-content nopadding>\n' +
  '  <ion-list>\n' +
  '    <ion-item text-left *ngFor="let item of items; let index = index" (click)="itemClick(index)"\n' +
  '              [ngClass]="{\'item-selected\':index==itemSelect}">{{item.code_name}}\n' +
  '    </ion-item>\n' +
  '  </ion-list>\n' +
  '</ion-content>',
})
export class SelectSearchListPage {

  private closeIndex: number = -1;
  codeList: any[] = [];
  items: any[] = [];
  search_key: any = {
    key_word: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.codeList = this.navParams.get("list");
    this.items = this.navParams.get("list");
  }

  getItems() {
    let vm = this;
    let val = vm.search_key.key_word;
    if (val && val.trim() != '') {
      vm.items = vm.items.filter((item) => {
        return (item.code_name.indexOf(val) > -1);
      })
    }
  }

  clearCondition() {
    this.search_key.key_word = '';
    this.items = this.codeList;
  }

  itemClick(index) {
    let vm = this;
    let code = this.items[index].code;
    for (let i = 0; i <= vm.codeList.length; i++) {
      if (code == vm.codeList[i].code) {
        vm.viewCtrl.dismiss(i);
        break;
      }
    }
  }

  closeModal() {
    this.viewCtrl.dismiss(this.closeIndex)
  }

}
