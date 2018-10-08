import {Config} from './config.model';

export const ENV: Config = {
  appID: "com.car.rental.easy",
  debug: true,
  isMobilePlatform: false,
  loginPath: "http://xxxx/core/oauth/token?client_id=client2&client_secret=secret&grant_type=password&username=app&password=",
  rootPath: "http://xxxx/core/r/api",
  basePath: "http://xxxx/core/r/api?sysName=HLS_APP&apiName=",
  riskPath: "",
  riskKey: "",
  pushKey: "",
  file_url: "http://xxxx/file/",
  dbName: "Function.db",
  dbLocation: 0,
  currentVersion: "0.0.1",
  version: "0.0.1",
  appEnvironment: "dev"
}
