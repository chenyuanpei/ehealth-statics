import {fork} from 'redux-saga/effects'

export default function * pageSaga() {
  // home
  yield fork(require('../../containers/home/sagas').default)
  // center
  yield fork(require('../../containers/center/center/sagas').default)
  yield fork(require('../../containers/center/accountedit/sagas.js').default)
  yield fork(require('../../containers/center/bindMobile/sagas').default)
  yield fork(require('../../containers/center/lzBindMobile/sagas').default)
  yield fork(require('../../containers/center/chengyisheng/sagas').default)
  yield fork(require('../../containers/center/chooseaccount/sagas').default)
  // member
  yield fork(require('../../containers/member/memberData/sagas').default)
  yield fork(require('../../containers/member/member/sagas').default)
  yield fork(require('../../containers/member/memberClaim/sagas').default)
  yield fork(require('../../containers/member/patientClaim/sagas').default)
  // devie
  yield fork(require('../../containers/device/devicelist/sagas').default)
  yield fork(require('../../containers/device/deviceinfo/sagas').default)
  yield fork(require('../../containers/device/bindroles/sagas').default)
  yield fork(require('../../containers/device/linkmans/sagas').default)
  yield fork(require('../../containers/device/linkmansdetail/sagas').default)
  yield fork(require('../../containers/device/specWifi/sagas').default)
  yield fork(require('../../containers/device/upgrade/sagas').default)
  yield fork(require('../../containers/device/upgradeStatus/sagas').default)
  yield fork(require('../../containers/device/voiceHistory/sagas').default)
  yield fork(require('../../containers/device/powerMode/sagas').default)
  yield fork(require('../../containers/device/deviceUnit/sagas').default)
  // 公共设备
  yield fork(require('../../containers/organization/publicDevice/sagas').default)
  yield fork(require('../../containers/organization/organizationInfo/sagas').default)
  yield fork(require('../../containers/organization/doctor/sagas').default)
  yield fork(require('../../containers/organization/deviceStatus/sagas').default)
  yield fork(require('../../containers/organization/memberInfo/sagas').default)
  // records
  yield fork(require('../../containers/records/bp/Trend/sagas').default)
  yield fork(require('../../containers/records/bp/History/sagas').default)
  yield fork(require('../../containers/records/bp/bpDetail/sagas').default)
  yield fork(require('../../containers/records/bp/bpAdd/sagas').default)
  yield fork(require('../../containers/records/list/sagas').default)
  yield fork(require('../../containers/records/bs/bsTable/sagas').default)
  yield fork(require('../../containers/records/bs/History/sagas').default)
  yield fork(require('../../containers/records/bs/bsAdd/sagas').default)
  yield fork(require('../../containers/records/bs/bsDetail/sagas').default)
  yield fork(require('../../containers/records/bs/Trend/sagas').default)
  yield fork(require('../../containers/records/temperature/add/sagas').default)
  yield fork(require('../../containers/records/temperature/chart/sagas').default)
  yield fork(require('../../containers/records/temperature/detail/sagas').default)
  // healthReport
  yield fork(require('../../containers/healthReport/weekly/detail/sagas').default)
  yield fork(require('../../containers/healthReport/weekly/list/sagas').default)
  // doctor
  yield fork(require('../../containers/doctor/relation/sagas').default)
  yield fork(require('../../containers/doctor/chat/sagas').default)
  yield fork(require('../../containers/doctor/doctorList/sagas').default)
  yield fork(require('../../containers/doctor/patientManage/sagas').default)


  // attention
  yield fork(require('../../containers/attention/attentionAccount/sagas').default)
  yield fork(require('../../containers/attention/attentioningMember/sagas').default)
  // others
  yield fork(require('../../containers/others/claimData/sagas').default)
  yield fork(require('../../containers/others/backDevice/sagas').default)
  yield fork(require('../../containers/others/measureremind/sagas.js').default)
  // 临时的
  yield fork(require('../../containers/temp/inputBpRecord/sagas').default)

  yield fork(require('../../containers/newbieTask/newbieTask/sagas').default)
  yield fork(require('../../containers/newbieTask/invitation/sagas').default)

  //weight
  yield fork(require('../../containers/weight/weight/sagas').default)
  yield fork(require('../../containers/weight/history/sagas').default)
  yield fork(require('../../containers/weight/add/sagas').default)
  yield fork(require('../../containers/weight/report/sagas').default)

  //sport
  yield fork(require('../../containers/sport/sport/sagas').default)
  yield fork(require('../../containers/sport/history/sagas').default)

  //sleep
  yield fork(require('../../containers/sleep/sleep/sagas').default)
  yield fork(require('../../containers/sleep/history/sagas').default)

  //heartRate
  yield fork(require('../../containers/heartRate/heartRate/sagas').default)
  yield fork(require('../../containers/heartRate/history/sagas').default)

  yield fork(require('../../containers/organization/doctor/sagas').default)

  //message
  yield fork(require('../../containers/message/message/sagas').default)

  // special
  yield fork(require('../../containers/special/womensDayOtc/sagas').default)
  yield fork(require('../../containers/special/publicDevice/sagas').default)
  yield fork(require('../../containers/special/publicDevicePost/sagas').default)
  yield fork(require('../../containers/special/companyInfo/sagas').default)
  yield fork(require('../../containers/special/poster/sagas').default)

  //术前管理
  yield fork(require('../../containers/doctorTeam/buy/sagas').default)
  yield fork(require('../../containers/doctorTeam/service/sagas').default)
  yield fork(require('../../containers/doctorTeam/endService/sagas').default)
  yield fork(require('../../containers/doctorTeam/preServiceBuy/sagas').default)
  yield fork(require('../../containers/doctorTeam/studio/sagas').default)
  yield fork(require('../../containers/doctorTeam/info/sagas').default)
  // 支付demo
  yield fork(require('../../containers/payDemo/sagas').default)
  // 本地切换用户
  yield fork(require('../../containers/others/changeUser/sagas').default)
  // 名医预约页面
  yield fork(require('../../containers/doctor/famousDoctor/sagas').default)
  // 资讯
  yield fork(require('../../containers/information/sagas').default)
  // 常见问题
  yield fork(require('../../containers/FAQ/sagas').default)

  //力美健身材排行榜
  yield fork(require('../../containers/figureRanking/rankingList/sagas').default)
  yield fork(require('../../containers/figureRanking/personal/sagas').default)
  yield fork(require('../../containers/figureRanking/sharePersonal/sagas').default)
  //智能实验室
  yield fork(require('../../containers/laboratory/list/sagas').default)
  yield fork(require('../../containers/laboratory/switch/sagas').default)
  yield fork(require('../../containers/laboratory/article/sagas').default)
  // 血压测量打卡活动
  yield fork(require('../../containers/clock/postInfo/sagas').default)
  yield fork(require('../../containers/clock/special/sagas').default)
  yield fork(require('../../containers/clock/mark/sagas').default)
  // 健康服务
  yield fork(require('../../containers/healthService/sagas').default)
  // 积分
  yield fork(require('../../containers/integral/myIntegral/sagas').default)
  yield fork(require('../../containers/integral/integralDetail/sagas').default)
}

// 那些页面 sagas 可以拿状态树 data节点 的配置
