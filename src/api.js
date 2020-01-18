var hostPath = 'http://121.196.192.110:2057/zhwy';
window.hostPath = hostPath;
export default {
  getInfo: 'http://localhost:3000/users/info',
  getGgType: hostPath + '/app/wycmscategory/list',
  getGgList: hostPath + '/app/wycms/list',
  getWyOpinionList: hostPath + '/app/wyopinion/list',
  postWyOpinionSave: hostPath + '/app/wyopinion/save',
  postWyServiceSave: hostPath + '/app/wyservice/save',
  getUserInfo: hostPath + '/app/txhn/getUserInfo',
  getPayList: hostPath + '/app/wypay/list',
  postWyserviceEvaluate: hostPath + '/app/wyservice/evaluate',
  getWyserviceList: hostPath + '/app/wyservice/list'
}
