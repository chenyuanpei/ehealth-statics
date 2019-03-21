import axios from 'axios'
import {fork, take, put, call, select} from 'redux-saga/effects'
import {replace} from 'react-router-redux'
import uuid from 'node-uuid'
// util
import {toast} from '../../../util/toast'
// actions
import {
  INIT_REQUEST,
  initSuccess,
  SHOW_INPUT_DIALOG,
  showInputDialogSuccess,
  SHOW_SELECT_DIALOG,
  showSelectDialogSuccess,
  SEND_REQUEST,
  PAGE_RELATION_DOCTOR_WATCH_CONFIRM,
  showConfirm,
  getAreaSuccess
} from './actions'
// selectors
import {memberSelector, doctorIdSelector} from './selectors'
import {apiUrl} from '../../../config'
// sagas
import {getDoctorById} from '../../../sagas/data/doctor'
// apis
import {sendRequestStatusApi, saveSendRequestApi} from '../../../apis/healthService/doctor'
import {getProvinces, getCities} from '../../../apis/healthService/area'
import {getMemberByIdApi} from '../../../apis/healthService/account'

// 监听初始化
function * watchInit() {
  while (true) {
    let {payload: {doctorId, memberId, member}} = yield take(INIT_REQUEST)
    const [
      {member: memberRes, error}
    ] = yield [
      call(getMember, memberId),
      call(getDoctorById, doctorId),
    ]
    if (error) { // 424用户不存在
      member={}
    } else {
      member = memberRes || {}
    }
    if (member && typeof(member.city) !== 'undefined') {
      const cityList = yield call(getCities, member.province)
      let provincesList = yield call(getProvinces)
      let province = provincesList.find(({id}) => id === member.province)
      let city = cityList.find(({id}) => id === member.city)
      if (!city)return ''
      let area = {}
      area.province = province.name
      area.city = city.name
      yield put(getAreaSuccess(area))
    }
    // 查看关联请求状态
    const status = yield call(sendRequestStatusApi, {doctorId, memberId})
    yield put(initSuccess({doctorId, status, member}))
  }
}

// 根据memberId获取member
function * getMember(memberId) {
  try {
    return {member: yield call(getMemberByIdApi, {memberId})} // {member:xxx}
  } catch (error) {
    return {error} // {error}
  }
}

function * watchShowInputDialog() {
  while (true) {
    const {payload: {filed, close}} = yield take(SHOW_INPUT_DIALOG)

    let member = yield select(memberSelector)

    // 输入框配置
    const inputOpts = {
      name: {
        maxLength: 5,
        title: '真实姓名',
        validation: (val) => {
          if (val === '爸爸' || val === '妈妈' || val === '自己') {
            toast('真实姓名不能是爸爸、妈妈、自己', {icon: 'warn'})
            return false
          }
        }
      },
      idNO: {
        maxLength: 20,
        title: '身份证号',
        type: 'number',
        validation: (val) => {
          if (val && !/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(val)) {
            toast('请输入正确的身份证号码', {icon: 'warn'})
            return false
          }
        }
      },
      phone: {
        maxLength: 11,
        title: '手机号码',
        type: 'number',
        validation: (val) => {
          if (!/^1[0-9]{10}$/i.test(val)) {
            toast('请输入正确的手机号码', {icon: 'warn'})
            return false
          }
        }
      },
      address: {
        maxLength: 20,
        title: '详细地址',
      }
    };

    let options = {
      filed,
      type: 'text',
      value: member[filed] === '请输入' ? '' : member[filed],
      pattern: '/^[A-Za-z0-9]*$/',
      show: !close,
      ...inputOpts[filed],
    };

    yield put(showInputDialogSuccess({
      options
    }))
  }
}

function * watchShowSelectDialog() {
  while (true) {
    const {payload: {filed, close, other}} = yield take(SHOW_SELECT_DIALOG)

    let member = yield select(memberSelector)

    // 下拉框配置
    const options = {
      filed,
      value: filed !== 'sickType' ? member[filed] : 0, // 为了让疾病类型弹出时显示高血压而不是空的 待优化
      type: filed,
      show: !close,
      ...other
    }
    let provincesList = yield call(getProvinces)
    if (filed === 'areaData') {
      options.value = [member.province || '300c2bb5975443ff999037133527db3b', member.city || '2ed50cf36f2949e0a97b274bed236d15']
      options.getValues = async(values, index) => {
        if (index === 1) {
          let provinceId = values[0]
            let url = apiUrl + '/supportplatform_service/area/getCitys/' + provinceId + '?appType=1&requestId=' + uuid.v4().replace(/-/g, '')

          return await axios.get(url).then(function (response) {
            const cityData = response['data']
            const cityList = cityData['data']
            return cityList
          }).catch(function (e) {
            console.log("Oops, error");
          })


        }
        return await new Promise(resolve => {
          resolve([...provincesList].map((province, i) => {
            return province
          }))
        })
      }
    }

    yield put(showSelectDialogSuccess({
      options
    }))
  }
}

// 监听
function * watchConfirm() {
  while (true) {
    yield take(PAGE_RELATION_DOCTOR_WATCH_CONFIRM)
    const member = yield select(memberSelector)

    if (!member.name || !member.name.trim().length) {
      toast('请输入真实姓名', {icon: 'warn'})
      continue
    }
    if (!member.sex) {
      toast('请选择性别', {icon: 'warn'})
      continue
    }
    if (!member.birthday) {
      toast('请选择出生日期', {icon: 'warn'})
      continue
    }

    let nowTime = new Date().getTime()
    // 不可重现的bug，偶然会出现出生年月变得很大。4106年之类的，但是月份和日期是正确的。这里强行叫用户重选一次。
    if (member.birthday > nowTime) {
      toast('出生年月有误，请重新选择', {icon: 'warn'})
      continue
    }

    if (!member.phone || !member.phone.trim().length || !/^1[0-9]{10}$/i.test(member.phone)) {
      toast('请正确填写手机', {icon: 'warn'})
      continue
    }
    yield put(showConfirm(true))

  }
}
function * watchSend() {
  while (true) {
    yield take(SEND_REQUEST)
    const member = yield select(memberSelector)

    const doctorId = yield select(doctorIdSelector)

    // 参数转换
    const apiParams = {
      ...member,
    }

    // doctorId ==> docId
    apiParams.docId = doctorId
    if(!apiParams.nickname){
      apiParams.nickname = apiParams.name
    }
    delete apiParams.doctorId // 原doctorId 关联的医生id数组
    try {
      yield call(saveSendRequestApi, apiParams)
      yield put(replace('doctor/relationsuccess'))
    } catch (e) {
      toast('服务器繁忙！', {icon: 'warn'})
    }

    // dispatch(relationDoctor(member, doctorId)).then(() => {
    //   // 显示已发送请求页面
    //   dispatch(confirmAction())
    // })
  }
}

export default function * doctorRelationSaga() {
  yield fork(watchInit)
  yield fork(watchShowInputDialog)
  yield fork(watchShowSelectDialog)
  yield fork(watchSend)
  yield fork(watchConfirm)
}
