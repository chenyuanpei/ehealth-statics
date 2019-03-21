import {createAction} from 'redux-actions'
import {put, select, call} from 'redux-saga/effects'
import {callApi} from '../api'

// actions
import {
  MEMBER_DOCTORS_REQUEST,
  MEMBER_DOCTORS_SUCCESS,
  MEMBER_DOCTORS_FAILURE,
  DOCTOR_REQUEST,
  DOCTOR_SUCCESS,
  DOCTOR_FAILURE,
  RELATION_DOCTORS_LIST_FAILURE,
  RELATION_DOCTORS_LIST_REQUEST,
  RELATION_DOCTORS_LIST_SUCCESS,
} from '../../actions/data/doctor'

// selectors
import {
  createMemberDoctorsSelector,
  createDoctorSelector
} from '../../selectors/data/doctor'

// apis
import {
  getDoctorByIdApi,
  getRelationDoctorsListApi,
} from '../../apis/healthService/doctor'

// schemas
import {DOCTOR, DOCTOR_ARRAY} from '../../schemas'

// 查询成员关联的医生集合
// export function * getMemberDoctors(memberId) {
//   const memberDoctors = yield select(createMemberDoctorsSelector(() => memberId))
//   if (memberDoctors) {
//     return memberDoctors
//   }
//   return yield callApi({
//     types: [
//       MEMBER_DOCTORS_REQUEST,
//       MEMBER_DOCTORS_SUCCESS,
//       MEMBER_DOCTORS_FAILURE,
//     ],
//     api: getDoctorsByMemberIdApi,
//     schema: DOCTOR_ARRAY,
//     data: {
//       memberId
//     },
//     formatResponse: (doctors = []) => doctors // 当没关联的医生时，接口返回空
//   })
// }

// 根据id获取医生
export function * getDoctorById(doctorId) {
  const doctor = yield select(createDoctorSelector(() => doctorId))
  if (doctor) {
    return doctor
  }
  return yield callApi({
    types: [
      DOCTOR_REQUEST,
      DOCTOR_SUCCESS,
      DOCTOR_FAILURE,
    ],
    api: getDoctorByIdApi,
    schema: DOCTOR,
    data: {
      id: doctorId
    }
  })
}

// 根据设备id获取医生列表
export function * getRelationDoctorList({deviceId}) {
  return yield callApi({
    types: [
      RELATION_DOCTORS_LIST_REQUEST,
      RELATION_DOCTORS_LIST_SUCCESS,
      RELATION_DOCTORS_LIST_FAILURE,
    ],
    api: getRelationDoctorsListApi,
    data: {
      deviceId
    }
  })
}
