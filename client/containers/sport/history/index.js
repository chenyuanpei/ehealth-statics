import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {debug} from '../../../util/common'
// components
import Title from '../../../components/common/title/Title'
import {RowFlex} from '../../../components/frozenui/grid'
import Data from '../../../components/sport/Data'
import Chart from '../../../components/sport/Chart'

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
    data:{}
  }

  componentDidMount(){
    const {init,params: {queryDate,memberId}} = this.props;
    init({queryDate,memberId});

    document.getElementsByTagName('body')[0].style.background='#ffffff'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.background=''
  }


  render(){
    require('../../../styles/sport/sport.styl')
    const {targetStep,stepData,stepHourlyData,params: {queryDate}} = this.props;

    let target=targetStep.step?targetStep.step:0;

    return (
      <div className="sport-page">
        <Title title="步数历史" />
        <div className="sport-chart">
          <h3 className="title">{titleTipsDay(queryDate)}</h3>
          <Chart stepHourlyData={stepHourlyData} />
        </div>
        <Data {...stepData} target={target} />
      </div>
    )
  }
})
