import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'

import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/heartRate/Data'
import Chart from '../../../components/heartRate/Chart'

import {titleTipsDay,titleTipsWeek} from '../../../util/sport/sport'


// actions
import actions from './actions'
// selector
import selectors from './selectors'

export default connect(
  selectors,
  actions
)(class extends Component{
  static defaultProps={
    markSamples:[
      {
        name: '热身',
        color: '#ffe400',
        lv: 4,
      },
      {
        name: '燃脂',
        color: '#ffb500',
        lv: 3,
      },
      {
        name: '耐力',
        color: '#f26b08',
        lv: 2
      },
      {
        name: '极限',
        color: '#e51111',
        lv: 1
      },
    ]
  }

  componentDidMount(){
    const {init,params: {memberId,t}} = this.props;
    init({memberId,t});

    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    this.props.clear()
    document.getElementsByTagName('body')[0].style.background=''
  }


  render(){
    require('../../../styles/heartRate/heartRate.styl')
    const {member,markSamples,heartRateData} = this.props;

    let birthday=20
    if(member&&member.age){
      birthday=member.age
    }

    let m=0
    if(heartRateData){
      m=heartRateData.measurementDate.replace(/-/g, '/')
    }

    let chartDiv=[]
    let dataDiv=[]
    dataDiv.push(<Data heartRateData={heartRateData} />)
    //let loaded=localStorage.getItem('hrhistoryload')
    //if(loaded=='true'){
      chartDiv.push(<Chart heartRateData={heartRateData} birthday={birthday} />)
      //localStorage.setItem('hrhistoryload','false')
    //}

    return (
      <div className="heartRate-page">
        <Title title="心率历史" />
        <div className="bg">
          <div className="title">{titleTipsDay(m)}</div>
          <ul className="mark-samples">
            {
              markSamples&&markSamples.map(
                (item,index)=>(
                  <li key={'i'+index}>
                    <span className="color-mark" style={{background:item.color}}></span>
                    {item.name}
                  </li>
                )
              )
            }
          </ul>
          {chartDiv}
        </div>
        <div className="desc">
          <div className="desc-item" style={{display:'none'}}></div>
          {dataDiv}
        </div>
      </div>
    )
  }

})
