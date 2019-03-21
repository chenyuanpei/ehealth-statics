import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'
import {myAccountSelector} from '../../../selectors/data/account'
import {createDeviceSelector} from '../../../selectors/data/device'
const publicDevicePageSelector = createSelector(
  pageSelector,
  (page) => page.get('publicDevice')
)

const deviceSelector = createDeviceSelector((state, props) => props.params.deviceId)
// member
export const memberSelector = createSelector(
  publicDevicePageSelector,
  (publicDeviceData) => publicDeviceData.get('public_device_member_data')
)

// voiceDataSelector
export const voiceDataSelector = createSelector(
  publicDevicePageSelector,
  (publicDeviceData) => publicDeviceData.get('voiceData')
)

export const organizationInfoSelector = createSelector(
  publicDevicePageSelector,
  (publicDeviceData) => publicDeviceData.get('organizationInfo')
)

// nextSelector
const shareShowSelector = createSelector(
  publicDevicePageSelector,
  (data) => data.get('shareShow')
)

// allRecordsSelector
const allRecordsSelector = createSelector(
  publicDevicePageSelector,
  (data) => data.get('allRecords')
)
// weightSuggestSelector
const weightSuggestSelector = createSelector(
  publicDevicePageSelector,
  (data) => data.get('weightSuggest')
)

// bptips 血压计 设备
export const bpRecordByIdSelector = createSelector(publicDevicePageSelector, (data) => data.get('bpRecordById'))
export const getDoctorList = createSelector(publicDevicePageSelector, (data) => data.get('doctorList'))
export const getBpSuggest = createSelector(publicDevicePageSelector, (data) => data.get('bpSuggestData'))
export const getBanner = createSelector(publicDevicePageSelector, (data) => data.get('bannerData'))
export const getHotNewList = createSelector(publicDevicePageSelector, (data) => data.get('hotNewList'))
// voiceListSelector
// const voiceListSelector = createSelector(
//   deviceVoiceHistoryPageSelector,
//   (data) => data.get('voiceList')
// )
//
// export const playingVoiceSelector = createSelector(
//   deviceVoiceHistoryPageSelector,
//   (data) => data.get('playingVoice')
// )

export default createStructuredSelector(
  {
    device: deviceSelector,
    public_device_member_data: memberSelector,
    organizationInfo: organizationInfoSelector,
    // voiceList: voiceListSelector,
    // playingVoice: playingVoiceSelector,
    account: myAccountSelector,
    voiceData:voiceDataSelector,
    shareShow: shareShowSelector,
    weightSuggest: weightSuggestSelector,
    allRecords: allRecordsSelector,
    bpRecordById:bpRecordByIdSelector,
    getDoctorList,
    getBpSuggest,
    getBanner,
    getHotNewList,
  }
)
