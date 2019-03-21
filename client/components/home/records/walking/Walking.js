// import React, {Component, PropTypes} from 'react'
// import classnames from 'classnames'
// import PubSub from 'pubsub-js'
//
// import {TOPIC_CHART_BOX_CLICK} from '../topic'
// import {RowFlex, Col} from '../../../frozenui/grid'
//
// export default class Walking extends Component {
//
//   handleChartBoxClick() {
//     PubSub.publish(TOPIC_CHART_BOX_CLICK, 'walking');
//   }
//
//   renderChart() {
//     return (<div></div>)
//   }
//
//   renderInfo() {
//
//     const {step} = this.props
//
//     return (
//       <div className="recordInfo">
//         <div className="recordIcon">
//           <img src="static/images/icon_blood_normal.png"/>
//         </div>
//         <RowFlex className="currentValBox">
//           <Col>
//             <span>{step}</span>
//             <span>{'步'}</span>
//           </Col>
//         </RowFlex>
//       </div>
//     )
//   }
//
//   render() {
//
//     require('../../../../styles/record/record.less')
//     require('../../../../styles/home/records.less')
//
//     const chart = (<div></div>)
//
//
//     return (
//       <div className={classnames("recordBox")}>
//         <div className={classnames("chartBox",`chartBg-walking`)} onClick={()=>this.handleChartBoxClick()}>
//           {this.renderChart()}
//         </div>
//         {this.renderInfo()}
//       </div>
//     )
//
//   }
//
// }
//
// Walking.propTypes = {
//   step: PropTypes.number.isRequired,
// }
