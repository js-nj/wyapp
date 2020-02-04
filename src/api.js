var hostPath = 'http://121.196.192.110:2057/zhwy';
window.hostPath = hostPath;
export default {
  //海纳个人信息
  // getInfo: 'http://localhost:3000/users/info',
  getUserInfo: hostPath + '/app/txhn/getUserInfo',
  //公告
  getGgType: hostPath + '/app/wycmscategory/list',
  getGgList: hostPath + '/app/wycms/list',
  getGgDetail: hostPath + '/app/wycms/info',
  //投诉建议
  getWyOpinionList: hostPath + '/app/wyopinion/list',
  postWyOpinionSave: hostPath + '/app/wyopinion/save',
  //支付
  getPayList: hostPath + '/app/wypay/list',
  getPayInfo: hostPath + '/app/wypay/info',
  postCreateOrder: hostPath + '/app/txhn/createOrder',
  //维修
  postWyserviceEvaluate: hostPath + '/app/wyservice/evaluate',
  getWyserviceListIn: hostPath + '/app/wyservice/listin',
  getWyserviceListComplete: hostPath + '/app/wyservice/listcomplete',
  postWyServiceSave: hostPath + '/app/wyservice/save',
  getWyServiceInfo: hostPath + '/app/wyservice/info',
  getWyservicecategory: hostPath + '/app/wyservicecategory/list',
  postWyserviceSure: hostPath + '/app/wyservice/sure',
  postWyserviceCancel: hostPath + '/app/wyservice/cancel',
  //维修工
  postLogin: hostPath + '/app/login',
  postRepairSubmit: hostPath + '/app/wyservice/repairSubmit',
  //门禁
  getOpenDoor: hostPath + '/app/wydoor/info'
  //图片上传的接口在代码内
}
