import React, {Component, PropTypes} from 'react'
import {immutableRenderDecorator} from 'react-immutable-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Bp from './records/bp/Bp'
// import Walking from './records/walking/Walking'
// import Weight from './records/weight/Weight'
// import Bg from './records/bg/Bg'
// import Sleep from './records/sleep/Sleep'
import Chat from './msg/Chat'
import HealthWeekly from './msg/HealthWeekly'
import MeasureActivity from './msg/MeasureActivity'

@immutableRenderDecorator
export default class ContentArea extends Component {

  static propTypes = {
    member: PropTypes.shape({
      name: PropTypes.string,
      nickname: PropTypes.string,
      remark: PropTypes.string,
      manager: PropTypes.bool,
    }).isRequired,
    bpValues: Bp.propTypes.values,
    bpActiveDegree: Bp.propTypes.activeDegree,
    doctors: PropTypes.array,
    unreadCount: PropTypes.array,
    moreInfo: Bp.propTypes.values,
  }

  render() {
    console.log('render ContentArea')
    const {member, moreInfo, bpActiveDegree, bpValues, doctors, lastMsg, leastReport} = this.props
    require('../../styles/home/contentArea.less')

    return (
      <div className="contentArea">
        {/* 血压 */}
        <Bp {...{
          activeDegree: bpActiveDegree,
          values: bpValues,
          moreInfo: moreInfo,
        }}/>
        {/* 血压活动 */}
        <MeasureActivity/>
        {/* 医生消息，只显示我管理的成员 */}
        {member.manager && doctors && !!doctors.length && doctors.map(({doctor, unreadCount}, index) => (
          <Chat key={doctor.id} doctor={doctor} count={unreadCount} lastMsg={lastMsg}/>
        ))}
        {/* 周报 */}
        {leastReport && leastReport.week && (
          <HealthWeekly
            nickname={member.remark || member.nickname || member.name}
            leastReport={leastReport}
          />
        )}
        {/* <Bg v1={6.2} v2={6.7}/ > */}
        {/* <Weight weight={56}/> */}
        {/* <Walking step={14980}/> */}
        {/* <Sleep hour={9} min={30}/> */}
      </div>
    )
  }

}
