var hostPath = window.hostPath;
var hostPath2 = window.hostPath2;
export default {
  //新修改后的
  UserCheckAdd: hostPath2 + '/WebService.asmx/UserCheckAdd',
  GetUserCheckDetails: hostPath2 + '/WebService.asmx/GetUserCheckDetails',
  GetWxUser: hostPath2 + '/WebService.asmx/GetWxUser',
  GetHouseList: hostPath2 + '/WebService.asmx/GetHouseList',
  PostSMS: hostPath2 + '/WebService.asmx/PostSMS',

  DoorList: hostPath2 + '/WebService.asmx/DoorList',
  DoorOpenList: hostPath2 + '/WebService.asmx/DoorOpenList',
  DoorOpen: hostPath2 + '/WebService.asmx/DoorOpen',

  GetADList: hostPath2 + '/WebService.asmx/GetADList',
  MenuList: hostPath2 + '/WebService.asmx/MenuList',

  CheckList: hostPath2 + '/WebService.asmx/CheckList',
  CheckByUserId: hostPath2 + '/WebService.asmx/CheckByUserId',

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
