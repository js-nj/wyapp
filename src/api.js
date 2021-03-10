var hostPath = window.hostPath;

export default {
  //新修改后的
  UserCheckAdd: 'http://daka.xixiaoli.com/WebService.asmx/UserCheckAdd',
  GetUserCheckDetails: 'http://daka.xixiaoli.com/WebService.asmx/GetUserCheckDetails',
  GetWxUser: 'http://daka.xixiaoli.com/WebService.asmx/GetWxUser',
  GetHouseList: 'http://daka.xixiaoli.com/WebService.asmx/GetHouseList',
  PostSMS: 'http://daka.xixiaoli.com/WebService.asmx/PostSMS',

  DoorList: 'http://daka.xixiaoli.com/WebService.asmx/DoorList',
  DoorOpenList: 'http://daka.xixiaoli.com/WebService.asmx/DoorOpenList',
  DoorOpen: 'http://daka.xixiaoli.com/WebService.asmx/DoorOpen',

  GetADList: 'http://daka.xixiaoli.com/WebService.asmx/GetADList',
  MenuList: 'http://daka.xixiaoli.com/WebService.asmx/MenuList',

  CheckList: 'http://daka.xixiaoli.com/WebService.asmx/CheckList',
  CheckByUserId: 'http://daka.xixiaoli.com/WebService.asmx/CheckByUserId',

  //海纳个人信息
  // getInfo: 'http://localhost:3000/users/info',
  getUserInfo: hostPath + '/app/txhn/getUserInfo',
  //公告
  getGgType: hostPath + '/app/wycmscategory/list',
  getGgList: hostPath + '/app/wycms/list',
  getGgDetail: hostPath + '/app/wycms/info',

  deleteGgitem: hostPath + '/app/wycms/delete',
  saveGgitem: hostPath + '/app/wycms/save',
  updateGgitem: hostPath + '/app/wycms/update',

  sendCmsNotify: hostPath + '/app/txhn/sendCmsNotify',
  //投诉建议
  getWyOpinionList: hostPath + '/app/wyopinion/list',
  postWyOpinionSave: hostPath + '/app/wyopinion/save',
  postWyoptionCancel: hostPath + '/app/wyopinion/cancel',
  getWyopinionlistforwy: hostPath + '/app/wyopinion/listforwy',
  getWyopinioninfo: hostPath + '/app/wyopinion/info',
  postWyopinionreplay: hostPath + '/app/wyopinion/replay',
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
  //获取待分配与已分配维修单
  getListwaitallocate: hostPath + '/app/wyservice/listwaitallocate',
  getListcompleteallocate: hostPath + '/app/wyservice/listcompleteallocate',
  getListrepairuser: hostPath + '/app/wyservice/listrepairuser',
  postAllocation: hostPath + '/app/wyservice/allocation',
  //维修工
  postLogin: hostPath + '/app/login',
  postRepairSubmit: hostPath + '/app/wyservice/repairSubmit',
  //门禁
  getOpenDoor: hostPath + '/app/wydoor/info',
  //物业设置接口
  getwysetting: hostPath + '/app/wysetting/list',
  //图片上传的接口在代码内
}
