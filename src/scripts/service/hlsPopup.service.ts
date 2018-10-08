import {Injectable} from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController,
  ActionSheetController,
  ModalController
} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {Dialogs} from '@ionic-native/dialogs';
import {ENV} from '@app/env';
import {SelectListPage} from "../../pages/modal/select-list"
import {SelectSearchListPage} from "../../pages/modal/select-search-list";

@Injectable()
export class hlsPopupService {

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public toast: Toast, public alertCtrl: AlertController, public dialogs: Dialogs, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {
  }

  private loader;
  private showBackdrop = false;
  private isLoading = false;

  /**
   * 锁屏操作
   * @param content 锁屏内容
   */

  showLoading(content?: string) {
    this.loader = this.loadingCtrl.create({
      content: content || '请稍等..',
      showBackdrop: this.showBackdrop
    });
    this.loader.present();
    this.isLoading = true;
  }

  /**
   * 解屏操作
   *
   */
  hideLoading() {
    let vm = this;
    if (this.isLoading) {
      vm.loader.dismiss();
      vm.isLoading = true;
    }

  }

  /**
   * 长时间顶部提示toast
   * @param content 内容
   */
  showLongTop(content?: string) {
    let text = content || '操作失败';
    if (!ENV.isMobilePlatform) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      this.toast.showLongTop(text).subscribe(date => {

      })
    }
  }

  /**
   * 长时间中部提示toast
   * @param content 内容
   */
  showLongCenter(content?: string) {
    let text = content || '操作失败';
    if (!ENV.isMobilePlatform) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'middle'
      });
      toast.present();
    } else {
      (<any>window).plugins.toast.showLongCenter(text, function (success) {
      }, function (error) {
      })
    }
  }

  /**
   * 长时间底部提示toast
   * @param content 内容
   */
  showLongBottom(content?: string) {
    let text = content || '操作失败';
    if (!ENV.isMobilePlatform) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } else {
      (<any>window).plugins.toast.showLongBottom(text, function (success) {
      }, function (error) {
      })
    }
  }

  /**
   * 成功提示框
   * @param content 内容
   */
  showSuccess(content?: string) {
    let text = content || '操作成功';
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="success" src="assets/icon/success.png"/>
        <div class="custom-spinner-text">` + text + `</div>
      </div>`,
      showBackdrop: this.showBackdrop,
      duration: 500
    });

    loader.present();
  }

  /**
   * 错误提示框
   * @param content 内容
   */
  showError(content?: string) {
    let text = content || '操作失败';
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <img class="error" src="assets/icon/error.png"/>
        <div class="custom-spinner-text error">` + text + `</div>
      </div>`,
      showBackdrop: this.showBackdrop,
      duration: 500
    });

    loader.present();
  }

  /**
   * 确定提示框
   * @param confirmObject
   * @param confirmObject.title 标题
   * @param confirmObject.content 副标题
   * @param confirmObject.onConfirm 回调函数
   */
  showPopup(confirmObject: any) {
    if (!ENV.isMobilePlatform) {
      let alert = this.alertCtrl.create({
        title: confirmObject.title || '提示',
        subTitle: confirmObject.content || '',
        enableBackdropDismiss: false,
        buttons: [{
          text: '确定',
          handler: () => {
            confirmObject.onConfirm();
          }
        }]
      });
      alert.present();
    } else {
      /*let alertDismissed = function (index) {
        confirmObject.onConfirm();
      };
      let title = confirmObject.title || '提示';
      let message = confirmObject.content;
      navigator.notification.alert(
        message, // message
        alertDismissed, // callback
        title || '提示', // title
        '确定' // buttonName
      );*/
      let title = confirmObject.title || '提示';
      let message = confirmObject.content;
      this.dialogs.alert(message, title, '确定').then(function () {
        confirmObject.onConfirm();
      })
    }
  }

  /**
   * confirm提示框
   * @param confirmObject
   * @param confirmObject.title 标题
   * @param confirmObject.content 副标题
   * @param confirmObject.onConfirm 回调函数
   */
  showConfirm(confirmObject: any) {
    if (!ENV.isMobilePlatform) {
      let alert = this.alertCtrl.create({
        title: confirmObject.title || '提示',
        subTitle: confirmObject.content || '',
        enableBackdropDismiss: false,
        buttons: [{
          text: '取消',
          role: 'cancel',
          cssClass: 'confirm-cancle',
          handler: () => {
            confirmObject.onConfirm(0)
          }
        },
          {
            text: '确定',
            handler: () => {
              confirmObject.onConfirm(1)
            }
          }]
      });
      alert.present();
    } else {
      let message = confirmObject.content || '';
      let title = confirmObject.title || '提示';
      /*let onConfirm = function (index) {
        confirmObject.onConfirm(index);
      };
      navigator.notification.confirm(
        message, // message
        function (index) {
          onConfirm(index - 1);
        },
        title, // title
        ['取消', '确定'] // buttonLabels
      );*/
      this.dialogs.confirm(message, title, ['取消', '确定']).then(function (index) {
        confirmObject.onConfirm(index - 1);
      })
    }
  }

  /**
   * ActionSheet弹出层
   * @param actionObject.title 标题
   * @param actionObject.buttonArray[i].title 按钮文字
   * @param actionObject.buttonArray[i].role  destructive or cancel
   * @param actionObject.buttonArray[title] 按钮文字
   * @param actionObject.callback 回调函数
   * @param actionObject.hideCancel 是否隐藏取消按钮 default false
   */
  showActionSheet(actionObject: any) {
    let title = actionObject.title;
    let buttons = [];
    for (let i = 0; i < actionObject.buttonArray.length; i++) {
      if (typeof actionObject.buttonArray[i] === 'object') {
        buttons.push({
          text: actionObject.buttonArray[i].text,
          role: actionObject.buttonArray[i].role,
          handler: () => {
            actionObject.callback(i)
          },
        })
      } else {
        buttons.push({
          text: actionObject.buttonArray[i],
          handler: () => {
            actionObject.callback(i)
          }
        })
      }
    }
    if (!actionObject.hideCancel) {
      buttons.push({
        text: '取消',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      })
    }
    //debugger;
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: buttons
    });
    actionSheet.present();

  }

  /**
   * 下拉框
   * @param selectObject.list 下拉框数据源
   * @param selectObject.returnItem 回调函数 返回 选中的index
   *
   */
  selectList(selectObject: any) {
    let list = selectObject.list;
    let selectModal = this.modalCtrl.create(SelectListPage, {
      list: list
    },{
      cssClass: "custom-select-modal",
      showBackdrop: true,
      enableBackdropDismiss: true
    });
    selectModal.onDidDismiss(index => {
      if (index >= 0) {
        selectObject.returnItem(index)
      }
    });
    selectModal.present();
  }

  /**
   * 带搜索下拉框
   * @param searchObject.list 下拉框数据源
   * @param searchObject.returnItem 回调函数 返回 选中的index
   *
   */
  selectSearchList(searchObject) {
    let list = searchObject.list;
    let selectSearchModal = this.modalCtrl.create(SelectSearchListPage, {
      list: list
    }, {
      cssClass: "custom-select-search-modal",
      showBackdrop: true,
      enableBackdropDismiss: true
    });
    selectSearchModal.onDidDismiss(index => {
      if (index >= 0) {
        searchObject.returnItem(index)
      }
    });
    selectSearchModal.present();

  }


}
