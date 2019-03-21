import {Map} from 'immutable'
import {createSelector} from 'reselect'
import {entitiesSelector} from '../entities'
import {dataSelector} from './index'

export const doctorEntitySelector = createSelector(
  entitiesSelector,
  entitiesData => entitiesData.get('doctor', Map())
)

// doctor
// export const doctorDataSelector = createSelector(
//   dataSelector,
//   (data) => data.get('doctor')
// )

// const doctorId = '11111'
// const doctor = createDoctorSelector(() => doctorId)(state)
export const createDoctorSelector = (doctorIdSelector) => createSelector(
  doctorEntitySelector,
  doctorIdSelector,
  (entities, doctorId) => entities.get(doctorId)
)

// memberDoctors 成员关联的医生集合
// export const createMemberDoctorsSelector = (memberIdSelector) => createSelector(
//   createSelector(doctorDataSelector, (data) => data.get('memberDoctors')),
//   memberIdSelector,
//   doctorEntitySelector,
//   (memberDoctors, memberId, entities) => {
//     const doctorIds = memberDoctors.get(memberId)
//     if (!doctorIds || !memberId) {
//       return null
//     }
//     return doctorIds.map(id => entities.get(id))
//   }
// )
