// import React, {Component, PropTypes} from 'react'
// import classnames from 'classnames'
// import PubSub from 'pubsub-js'
//
// import {TOPIC_CHART_BOX_CLICK} from '../topic'
// import {RowFlex, Col} from '../../../frozenui/grid'
// import LineChart from '../../../record/LineChart'
//
// export default class Bp extends Component {
//
//   handleChartBoxClick() {
//     PubSub.publish(TOPIC_CHART_BOX_CLICK, 'bg');
//   }
//
//   renderChart() {
//
//
//     const options = {
//       yAxis: {
//         defMax: 20,
//         defMin: 0,
//         minScale: 5
//       },
//     }
//
//
//     options.values = [
//       {
//         name: '高压',
//         //values: [120, 130, 160, 140, 110, 150, 175, 180, 190, 174, 120, 130, 160, 140, 110, 150, 175, 180, 190, 174, 120, 130, 160, 140, 110, 150, 175, 180, 190, 174],
//         values: [5.4, 3.6, 6.4, 5.3, 1.1, 12.3,],
//
//       },
//       {
//         name: '低压',
//         //values: [ 70, 80, 79, 110, 69, 100, 120, 124, 135, 87, 70, 80, 79, 110, 69, 100, 120, 124, 135, 87, 70, 80, 79, 110, 69, 100, 120, 124, 135, 87         ],
//         values: [3.5, 2.5, 2.1, 3.3, 1, 10],
//       }
//     ]
//
//     return (<LineChart  {...options}/>)
//   }
//
//   renderInfo() {
//
//     const {v1, v2} = this.props
//
//     return (
//       <div className="recordInfo">
//         <div className="recordIcon recordText">
//           <img src="static/images/icon_blood_light.png"/>
//           <span className="recordLight">轻度</span>
//         </div>
//         <RowFlex className="currentValBox">
//           <Col>
//             <span>{v1}</span>
//             <span>{'mmol/L'}</span>
//           </Col>
//           <Col>
//             <span>{v2}</span>
//             <span>{'mmol/L'}</span>
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
//       <div className={classnames("recordBox","bgRecord")}>
//         <div className={classnames("chartBox",`chartBg-bg`)} onClick={()=>this.handleChartBoxClick()}>
//           <div className="chartBoxTop">
//             <span>血压</span>
//             <div>
//               <span>本周测量4次</span>
//               <span>正常3次</span>
//               <span>异常1次</span>
//             </div>
//           </div>
//           <div className="charTop">
//             <span>最近7次数据</span>
//             <span>{'2月22日 7:30'}</span>
//           </div>
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
// Bp.propTypes = {
//   v1: PropTypes.number.isRequired,
//   v2: PropTypes.number.isRequired,
// }
