import {List} from 'immutable'
import {createSelector, createStructuredSelector} from 'reselect'
// const
import {CREATE_MEMBER_ID} from '../../const/member'
// selectors
import {pageSelector} from '../../selectors/page'
import {accountMembersSelector, subscribeMembersSelector, createMemberSelector} from '../../selectors/data/member'
import {createStatPatientSelector} from '../../selectors/data/statPatient'
import {doctorEntitySelector} from '../../selectors/data/doctor'
import {createMemberLeastReportSelector} from '../../selectors/data/report'
import {unreadCountSelector as imUnreadCountSelector} from '../../selectors/im'

import {targetStepSelector,lastStepDataSelector,stepHourlyDataSelector,stepListSelector} from '../../selectors/data/sport'
import {lastSevenWeightDataSelector,lastWeightDataSelector,allWeightSelector,twoWeightDataSelector} from '../../selectors/data/weight'
import {sleepDataSelector,sleepListSelector} from '../../selectors/data/sleep'
import {heartRateDataSelector,heartRateListSelector} from '../../selectors/data/heartRate'



const homeSelector = createSelector(
  pageSelector,
  (page) => page.get('home')
)

// 当前选择的memberId
export const memberIdSelector = createSelector(
  homeSelector,
  (home) => home.get('memberId')
)

export const loadedSelector = createSelector(
  homeSelector,
  (home) => home.get('loaded')
)

export const bsLastDataSelector = createSelector(
  homeSelector,
  (home) => home.get('bsLastData')
)
//当天的血糖记录
export const bsAverageHourRecordSelector = createSelector(
  homeSelector,
  (home) => home.get('bsAverageHourRecord')
)

// 当前member
export const memberSelector = createMemberSelector(memberIdSelector)



// 所有成员列表
export const createMember = {
  id: CREATE_MEMBER_ID,
  nickname: '添加成员'
}
export const membersSelector = createSelector(
  accountMembersSelector,
  subscribeMembersSelector,
  (accountMembers, subscribeMembers) => {
    if (!accountMembers || !subscribeMembers) {
      return List()
    }
    return accountMembers.concat(subscribeMembers).push(createMember)
  }
)


// 最新一条记录
export const statPatientSelector = createStatPatientSelector(memberIdSelector)

// 医生
export const doctorsSelector = createSelector(
  memberSelector,
  doctorEntitySelector,
  imUnreadCountSelector,
  (member, doctorEntity, imUnreadCount) => {
    if (!member || !member.relations) {
      return null
    }
    return member.relations.map(({tid, doctorId}) => {
      // unreadCountdoctors
      const sessionId = `${member.id}-${tid}`
      const unreadCount = imUnreadCount.get(sessionId)
      return {
        doctor: doctorEntity.get(doctorId),
        tid,
        unreadCount
      }
    })
  }
)

// 健康周报
const leastReportSelector = createSelector(
  createMemberLeastReportSelector(memberIdSelector),
  (memberLeastReport) => memberLeastReport ? memberLeastReport.report : null
)

export const sportTargetStep = targetStepSelector(memberIdSelector)
export const sportLastStepData = lastStepDataSelector(memberIdSelector)
export const sportStepHourlyData = stepHourlyDataSelector(memberIdSelector)
export const sportStepList = stepListSelector(memberIdSelector)

export const lastWeightData = lastWeightDataSelector(memberIdSelector)
export const allWeightData = allWeightSelector(memberIdSelector)
export const lastSevenWeightData = lastSevenWeightDataSelector(memberIdSelector)
export const twoWeightData = twoWeightDataSelector(memberIdSelector)
export const sleepData = sleepDataSelector(memberIdSelector)
export const sleepList = sleepListSelector(memberIdSelector)
export const heartRateData = heartRateDataSelector(memberIdSelector)
export const heartRateList = heartRateListSelector(memberIdSelector)


export default createStructuredSelector({
  memberId: memberIdSelector,
  member: memberSelector,
  members: membersSelector,
  statPatient: statPatientSelector,

})

