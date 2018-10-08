import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {hlsPopupService} from "./hlsPopup.service";
import {LocalStorageService} from "./localStorage.service";
import {ENV} from "@app/env";

@Injectable()
export class hlsHttpService {

  constructor(private http: HttpClient, private hlsPopup: hlsPopupService, private local: LocalStorageService) {
  }

  toJsonReplace(key,value){
    return value
  }

  /**
   * post请求
   * @param {string} url
   * @param {any} body
   * @returns {Promise<any>}
   */


  post(url: string, body?: any): Promise<any> {
    let vm = this;
    if (vm.local.get("user_id")) {
      body.user_id = vm.local.get("user_id");
    }
    if (ENV.debug) {
      let postName="POST";
      console.log(postName + " Start!");
      console.log(postName + " url " + url);
      console.log(postName + " param " + JSON.stringify(body,vm.toJsonReplace,2));
    }
    return new Promise((resolve, reject) => {
      vm.http.post(url, body).subscribe(res => {
        resolve(res);
      }, res => {
        vm.hlsPopup.showError(res.message);
      })

    });
  }

  /**
   * get请求
   * @param {String} url
   * @param {any} body
   * @returns {Promise<any>}
   */
  get (url: string): Promise<any> {
    let vm = this;
    if (ENV.debug) {
      let postName="GET";
      console.log(postName + " Start!");
      console.log(postName + " url " + url);
    }
    return new Promise((resolve, reject) => {
      vm.http.get(url).subscribe(res => {
        resolve(res)
      }, res => {
        vm.hlsPopup.showError(res.message);
      })
    })
  }

}
