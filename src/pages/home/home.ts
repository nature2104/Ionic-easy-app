import {Component, ViewChild} from '@angular/core';
import {NavController, Content,ModalController} from 'ionic-angular';
import {MasterPage} from "../master/master";
import {hlsPopupService} from "../../scripts/service/hlsPopup.service"
import {ENV} from "@app/env";
import {hlsHttpService} from "../../scripts/service/hlsHttp.service";
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from "../../scripts/service/localStorage.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  items: any = [];

  constructor(public navCtrl: NavController, public hlsPopup: hlsPopupService, public hlsHttp: hlsHttpService, public http: HttpClient, public local: LocalStorageService,public modalCtrl:ModalController) {

  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  goMaster() {
    this.navCtrl.push(MasterPage,{
      id: "123",
      name: "Carl"
    })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.items.length);
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push(this.items.length);
      }
      refresher.complete();
    }, 500);
  }

  clickOption() {
    console.log('clickOption')
  }

  itemClick(index) {
    console.log('itemClick', index)
  }

  showLoading() {
    let vm = this;
    this.hlsPopup.showLoading();
    setTimeout(function () {
      vm.hlsPopup.hideLoading();
    }, 300)
  }

  showLongTop() {
    this.hlsPopup.showLongTop("操作成功");
  }

  showLongCenter() {
    this.hlsPopup.showLongCenter("操作成功");
  }

  showLongBottom() {
    this.hlsPopup.showLongBottom("操作成功")
  }

  showSuccess() {
    this.hlsPopup.showSuccess("操作成功")
  }

  showError() {
    this.hlsPopup.showError("登录已失效，请重新登录")
  }

  showPopup() {
    this.hlsPopup.showPopup({
      title: '确定退出',
      content: "退出后需要从新登录",
      onConfirm: () => {
        console.log('123');
      }

    })
  }

  showConfirm() {
    this.hlsPopup.showConfirm({
      title: '确定退出',
      content: "退出后需要从新登录",
      onConfirm: (value) => {
        console.log(value);
      }

    })
  }

  showActionSheet() {
    this.hlsPopup.showActionSheet({
      title: '照片选择',
      buttonArray: [{"text": "相机"}, {"text": "相册"}],
      hideCancel: false
    });
  }

  httpPost() {
    let vm = this;
    let url = ENV.loginPath + 'appadmin';
    let params = {}
    this.hlsPopup.showLoading("请稍等..");
    this.hlsHttp.post(url, params).then(res => {
      vm.hlsPopup.hideLoading();
      vm.local.set("access_token", res.access_token);
    })
  }

  httpPostLogin() {
    let vm = this;
    this.hlsPopup.showLoading("请稍等..");
    let url = ENV.basePath + 'login';
    let param = {"user_name": "hand", "user_password": "1"};
    this.hlsHttp.post(url, param).then(res => {
      vm.hlsPopup.showSuccess("登录成功");
      vm.hlsPopup.hideLoading();
    })
  }

  hlsPostGet() {
    let vm = this;
    this.hlsPopup.showLoading("请稍等..");
    let url = ENV.rootPath + '/app/queryHomePicture';
    this.hlsHttp.get(url).then(res => {
      vm.hlsPopup.hideLoading();
    }, res => {

    });
  }

  selectList() {
    let list = [{
      "code": "NP",
      "code_name": "个人"
    }, {
      "code": "BP",
      "code_name": "承租人"
    }, {
      "code": "ORG",
      "code_name": "法人"
    }, {
      "code": "TEST1",
      "code_name": "测试1"
    }, {
      "code": "TEST2",
      "code_name": "测试2"
    }, {
      "code": "NP",
      "code_name": "个人"
    }, {
      "code": "BP",
      "code_name": "承租人"
    }, {
      "code": "ORG",
      "code_name": "法人"
    }, {
      "code": "TEST1",
      "code_name": "测试1"
    }, {
      "code": "TEST2",
      "code_name": "测试2"
    }]
    this.hlsPopup.selectList({
      list: list,
      code: "bp_class",
      object: {},
      returnItem(index) {
        console.log(list[index])
      }
    })
  }

  selectSearchList(){
    let list = [{
      "code": "NP",
      "code_name": "个人"
    }, {
      "code": "BP",
      "code_name": "承租人"
    }, {
      "code": "ORG",
      "code_name": "法人"
    }, {
      "code": "TEST1",
      "code_name": "测试1"
    }, {
      "code": "TEST2",
      "code_name": "测试2"
    }, {
      "code": "NP",
      "code_name": "个人"
    }, {
      "code": "BP",
      "code_name": "承租人"
    }, {
      "code": "ORG",
      "code_name": "法人"
    }, {
      "code": "TEST1",
      "code_name": "测试1"
    }, {
      "code": "TEST2",
      "code_name": "测试2"
    }]

    this.hlsPopup.selectSearchList({
      list:list,
      returnItem(index){
        console.log(list[index])
      }
    })

  }

}
