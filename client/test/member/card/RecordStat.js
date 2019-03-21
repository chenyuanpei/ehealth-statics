import React,{Component,PropTypes} from 'react'
import RecordStat from '../../../components/member/card/RecordStat'

const style = {
    height: '100%'
}

export default class RecordStatTest extends Component {

    render() {

        return (
            <div style={style}>
                <RecordStat/>
            </div>
        )
    }
}

export default {
    name: 'member/card/RecordStat',
    component: (
        <RecordStatTest></RecordStatTest>
    )
}