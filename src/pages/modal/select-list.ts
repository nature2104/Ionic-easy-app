import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the SelectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-select-list',
  template: '<ion-header>\n' +
  '  <ion-navbar>\n' +
  '    <ion-buttons start (click)="onCancle()">\n' +
  '      <button ion-button >\n' +
  '        取消\n' +
  '      </button>\n' +
  '    </ion-buttons>\n' +
  '    <ion-buttons end (click)="onConfirm()">\n' +
  '      <button ion-button >\n' +
  '        确定\n' +
  '      </button>\n' +
  '    </ion-buttons>\n' +
  '  </ion-navbar>\n' +
  '</ion-header>\n' +
  '<ion-content nopadding>\n' +
  '  <div ion-item text-center *ngFor="let item of items; let index = index" (click)="itemClick(index)" [ngClass]="{\'item-selected\':index==itemSelect}">{{item.code_name}}\n' +
  '  </div>\n' +
  '</ion-content>\n',
})
export class SelectListPage {

  items: any[] = [];

  itemSelect: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    this.items = navParams.get('list')
    if (this.items.length) {
      this.itemSelect = 0;
    }

  }


  itemClick(index) {
    this.itemSelect = index;
  }

  onCancle() {
    this.viewCtrl.dismiss(-1)
  }

  onConfirm(index) {
    if (index > 0) {
      this.viewCtrl.dismiss(index)
    } else {
      this.viewCtrl.dismiss(this.itemSelect)
    }

  }




}
