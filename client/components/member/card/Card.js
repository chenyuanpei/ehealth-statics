import React,{Component,PropTypes} from 'react'
import SlideMember from './SlideMember'

export default class Card extends Component {

    render() {

        require('../../../styles/memberIndex/card.less')

        const {members,onMemberChange} = this.props

        return (
            <div className={'memberCard'}>
                <div className={'slideMemberContainer'}>
                    <SlideMember {...{members, onChange: onMemberChange}}  />
                </div>
            </div>
        )
    }
}

const {members,onChange:onMemberChange}= SlideMember.propTypes

Card.propTypes = {
    members,
    onMemberChange
}
