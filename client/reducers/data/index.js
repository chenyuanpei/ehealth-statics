import {combineReducers} from 'redux-immutable'

export default combineReducers({
  login: require('./login').default,
  account: require('./account').default,
  member: require('./member').default,
  bp: require('./bp').default,
  bs: require('./bs').default,
  tp: require('./tp').default,
  statPatient : require('./statPatient').default,
  device: require('./device').default,
  doctor: require('./doctor').default,
  report: require('./report').default,
  sport: require('./sport').default,
  weight: require('./weight').default,
  sleep: require('./sleep').default,
  heartRate: require('./heartRate').default,
  information: require('./information').default,
})


// 状态树 data节点配置