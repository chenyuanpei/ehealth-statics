import {createSelector} from 'reselect'
import {doctorEntitySelector} from '../entities'

// 获取指定id医生
export const doctorSelector = createSelector(
  doctorEntitySelector,
  (state, props) => props.params ? props.params.doctorId : props,
  (doctorEntity, doctorId) => doctorEntity && doctorEntity[doctorId]
)

export const getDoctorByIdSelector = (doctorId) => createSelector(
  doctorEntitySelector,
  (doctorEntity) => doctorEntity && doctorEntity[doctorId]
)
