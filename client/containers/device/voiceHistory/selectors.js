import {createSelector, createStructuredSelector} from 'reselect'
import {pageSelector} from '../../../selectors/page'
import {List} from 'immutable'

const deviceVoiceHistoryPageSelector = createSelector(
  pageSelector,
  (page) => page.get('deviceVoiceHistory')
)

// voiceListSelector
const voiceListSelector = createSelector(
  deviceVoiceHistoryPageSelector,
  (data) => data.get('voiceList')
)

export const playingVoiceSelector = createSelector(
  deviceVoiceHistoryPageSelector,
  (data) => data.get('playingVoice')
)

export default createStructuredSelector(
  {
    voiceList: voiceListSelector,
    playingVoice: playingVoiceSelector,
  }
)
