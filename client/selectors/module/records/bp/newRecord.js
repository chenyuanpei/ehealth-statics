import {createSelector,createSelectorCreator} from 'reselect'

//selectors
import {bpRecordSelector} from './index'


//state-records-bp-roundRecord
export const newReocrdSelector = createSelector(
    bpRecordSelector,
    (bpRecord)=>bpRecord.newRecord
)
