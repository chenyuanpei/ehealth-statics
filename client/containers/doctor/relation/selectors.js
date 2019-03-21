import {createSelector, createStructuredSelector} from 'reselect'

// selectors
import {pageSelector} from '../../../selectors/page'
import {createDoctorSelector} from '../../../selectors/data/doctor'

// doctorRelation
const doctorRelationSelector = createSelector(
  pageSelector,
  (page) => page.get('doctorRelation')
)

// doctorId
export const doctorIdSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('doctorId'))
export const areaDataSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('areaData'))
export const isShowConfirmSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('isShowConfirm'))

// doctor
const doctorSelector = createDoctorSelector(doctorIdSelector)

// inputDialogOptions
export const inputDialogOptionsSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('inputDialogOptions'))

// select
export const selectDialogOptionsSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('selectDialogOptions'))

// member
export const memberSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('member'))

// sent
export const sentSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('sent'))

// status
export const statusSelector = createSelector(doctorRelationSelector, (doctorRelation) => doctorRelation.get('status'))

export default createStructuredSelector(
  {
    doctor: doctorSelector,
    inputDialogOptions: inputDialogOptionsSelector,
    selectDialogOptions: selectDialogOptionsSelector,
    member: memberSelector,
    sent: sentSelector,
    status: statusSelector,
    areaData: areaDataSelector,
    isShowConfirm:isShowConfirmSelector
  }
)
