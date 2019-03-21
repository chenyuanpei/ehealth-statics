import {combineReducers} from 'redux-immutable'

export default combineReducers({
  // home
  home: require('../../containers/home/reducers').default,
  // member
  memberData: require('../../containers/member/memberData/reducers').default,
  memberClaim: require('../../containers/member/memberClaim/reducers').default,
  patientClaim: require('../../containers/member/patientClaim/reducers').default,
  // records
  bpTrend: require('../../containers/records/bp/Trend/reducers').default,
  bpHistory: require('../../containers/records/bp/History/reducers').default,
  weeklyReportDetail: require('../../containers/healthReport/weekly/detail/reducers').default,
  bpDetail: require('../../containers/records/bp/bpDetail/reducers').default,
  bpAdd: require('../../containers/records/bp/bpAdd/reducers').default,
  recordsList: require('../../containers/records/list/reducers').default,
  bsTable: require('../../containers/records/bs/bsTable/reducers').default,
  bsHistory: require('../../containers/records/bs/History/reducers').default,
  bsAdd: require('../../containers/records/bs/bsAdd/reducers').default,
  bsDetail: require('../../containers/records/bs/bsDetail/reducers').default,
  bsTrend: require('../../containers/records/bs/Trend/reducers').default,
  temperatureAdd: require('../../containers/records/temperature/add/reducers').default,
  temperatureHistory: require('../../containers/records/temperature/chart/reducers').default,
  tpDetail: require('../../containers/records/temperature/detail/reducers').default,

  weeklyReportList: require('../../containers/healthReport/weekly/list/reducers').default,
  // device
  deviceList: require('../../containers/device/devicelist/reducers').default,
  deviceInfo: require('../../containers/device/deviceinfo/reducers').default,
  bindRole: require('../../containers/device/bindroles/reducers').default,
  linkMans: require('../../containers/device/linkmans/reducers').default,
  linkMansDetail: require('../../containers/device/linkmansdetail/reducers').default,
  specWifi: require('../../containers/device/specWifi/reducers').default,
  upgrade: require('../../containers/device/upgrade/reducers').default,
  deviceVoiceHistory: require('../../containers/device/voiceHistory/reducers').default,
  devicePowerMode: require('../../containers/device/powerMode/reducers').default,
  deviceUnit: require('../../containers/device/deviceUnit/reducers').default,
  // center
  accountEdit: require('../../containers/center/accountedit/reducers').default,
  bindMobile: require('../../containers/center/bindMobile/reducers').default,
  lzBindMobile: require('../../containers/center/lzBindMobile/reducers').default,
  chengyisheng: require('../../containers/center/chengyisheng/reducers').default,
  chooseaccount: require('../../containers/center/chooseaccount/reducers').default,
  center:require('../../containers/center/center/reducers.js').default,
  // doctor
  doctorRelation: require('../../containers/doctor/relation/reducers').default,
  doctorChat: require('../../containers/doctor/chat/reducers').default,
  doctorList: require('../../containers/doctor/doctorList/reducers').default,
  patientManage: require('../../containers/doctor/patientManage/reducers').default,


  // attention
  attentionAccount: require('../../containers/attention/attentionAccount/reducers').default,
  attentioningMember: require('../../containers/attention/attentioningMember/reducers').default,
  // others
  claimData: require('../../containers/others/claimData/reducers').default,
  backDevice: require('../../containers/others/backDevice/reducers').default,
  measureRemind: require('../../containers/others/measureremind/reducers.js').default,
  newbieTask:require('../../containers/newbieTask/newbieTask/reducers.js').default,
  //weight
  weight:require('../../containers/weight/weight/reducers.js').default,
  weightHistory:require('../../containers/weight/history/reducers.js').default,
  weightAdd:require('../../containers/weight/add/reducers.js').default,
  weightReport:require('../../containers/weight/report/reducers.js').default,
  //sport
  sport:require('../../containers/sport/sport/reducers.js').default,
  sportHistory:require('../../containers/sport/history/reducers.js').default,
  //sleep
  sleep:require('../../containers/sleep/sleep/reducers.js').default,
  sleepHistory:require('../../containers/sleep/history/reducers.js').default,
  //heartRate
  heartRate:require('../../containers/heartRate/heartRate/reducers.js').default,
  heartRateHistory:require('../../containers/heartRate/history/reducers.js').default,
  // publicDevice
  publicDevice:require('../../containers/organization/publicDevice/reducers.js').default,
  organization:require('../../containers/organization/organizationInfo/reducers.js').default,
  organDoctor:require('../../containers/organization/doctor/reducers.js').default,
  memberInfo:require('../../containers/organization/memberInfo/reducers.js').default,
  //message
  message:require('../../containers/message/message/reducers.js').default,
  // special
  womensday:require('../../containers/special/womensDayOtc/reducers.js').default,
  specialPublicDevice:require('../../containers/special/publicDevice/reducers.js').default,
  publicDevicePost:require('../../containers/special/publicDevicePost/reducers.js').default,
  companyInfo:require('../../containers/special/companyInfo/reducers.js').default,
  poster:require('../../containers/special/poster/reducers.js').default,

  doctorTeamBuy:require('../../containers/doctorTeam/buy/reducers.js').default,
  doctorTeamService:require('../../containers/doctorTeam/service/reducers.js').default,
  endService:require('../../containers/doctorTeam/endService/reducers.js').default,
  payDemo:require('../../containers/payDemo/reducers.js').default,
  changeUser:require('../../containers/others/changeUser/reducers.js').default,
  famousDoctor:require('../../containers/doctor/famousDoctor/reducers.js').default,
  preServiceBuy: require('../../containers/doctorTeam/preServiceBuy/reducers').default,
  studio: require('../../containers/doctorTeam/studio/reducers').default,
  patientEducation: require('../../containers/doctorTeam/info/reducers').default,

  // 资讯
  information:require('../../containers/information/reducers').default,
  // 常见问题
  FAQ:require('../../containers/FAQ/reducers').default,
  //力美健身材排行榜
  rankingList:require('../../containers/figureRanking/rankingList/reducers').default,
  personal:require('../../containers/figureRanking/personal/reducers').default,
  sharePersonal:require('../../containers/figureRanking/sharePersonal/reducers').default,
  //智能实验室
  laboratory:require('../../containers/laboratory/list/reducers').default,
  laboratorySwitch:require('../../containers/laboratory/switch/reducers').default,
  laboratoryArticle:require('../../containers/laboratory/article/reducers').default,
  // 血压测量打卡活动
  clockPostInfo:require('../../containers/clock/postInfo/reducers').default,
  clockIndex:require('../../containers/clock/special/reducers').default,
  clockMark:require('../../containers/clock/mark/reducers').default,
  healthService:require('../../containers/healthService/reducers').default,
  // 积分
  myIntegral:require('../../containers/integral/myIntegral/reducers').default,
  integralDetail:require('../../containers/integral/integralDetail/reducers').default,

})

// 状态树  page节点
