import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {hlsPopupService} from "../service/hlsPopup.service";
import {LocalStorageService} from "../service/localStorage.service";
import {ENV} from "@app/env";

@Injectable()
export class HttpFilter implements HttpInterceptor {
  constructor(private local: LocalStorageService, private hlsPopup: hlsPopupService) {
  }
  toJsonReplace(key,value){
    return value
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = null;
    let vm = this;
    if (this.local.get('access_token')) {
      cloneReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.local.get('access_token'),
          'Content-Type': 'application/json;charset=UTF-8'
        }
      });
    } else {
      cloneReq = req.clone({
        setHeaders: {
          'Content-Type': "application/json;charset=UTF-8"
        }
      });
    }
    return next.handle(cloneReq).map((event) => {
      if (event instanceof HttpResponse) {
        if (ENV.debug) {
          let postName = 'request';
          console.log(postName + " success");
          console.log(postName + " response " + JSON.stringify(event.body,vm.toJsonReplace,2)); //
          console.log(postName + " End!");
        }
        //debugger;
        switch (event.status) {
          case 200:
            if (event.body['result'] && event.body['result'] == "E") {
              let message = event.body['message'];
              vm.hlsPopup.hideLoading();
              vm.hlsPopup.showError(message);
            } else {
              return event;
            }
        }
      }
    }).catch((res: HttpResponse<any>) => {
      if (ENV.debug) {
        let postName = 'request';
        console.log(postName + " error");
        console.log(postName + " response " + JSON.stringify(res,vm.toJsonReplace,2));
        console.log(postName + " End!");
      }
      let error :any = {
        status: res.status
      };
      switch (res.status) {
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '登录已失效，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误,未找到该资源'
          break;
        case 405:
          error.message = '不支持的请求类型'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务器端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = '连接错误'+res.status
      }
      // 以错误的形式结束本次请求
      vm.hlsPopup.hideLoading();
      //vm.hlsPopup.showError(error.message);
      return Observable.throw(error);
    });
  }
}
