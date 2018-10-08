import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ENV} from '@app/env';

@Component({
  selector: 'page-master',
  templateUrl: 'master.html'
})
export class MasterPage {

  appEnvironment: String = ENV.appEnvironment;

  id: number;
  name: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('name');
  }


}
