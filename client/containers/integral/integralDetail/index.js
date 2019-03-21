import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
// utils
// selector
import selectors from './selectors'
// actions
import actions from './actions'
// components


import ScrollView from '../../../components/common/scroll/ScrollView'
import Title from '../../../components/common/title/Title'
import moment from 'moment'
export default connect(
  selectors,
  actions
)(class extends Component {

  componentDidMount() {
    const {loadData} = this.props
    loadData({pageLoad: true})
  }
  _getBpHistory() {
    const {integralHistory,loadData} = this.props
    loadData({integralHistory})
  }
  render() {
    const {integralHistory} = this.props
    require('../../../styles/integral/index.less')
    return (
      <div className="m-integral-wrap">
        <Title title="积分详情" />
        <div className="m-integral-history">
          <ScrollView onScrollEnd={() => this._getBpHistory()}>

            <ul className="m-integral-detail-list">

              {
                integralHistory && integralHistory.map((data,index)=>{
                  return (
                    <li key={index} className="m-integral-detail-list-item">
                      <div className="m-left">
                        <div className="m-title">
                          {data.ruleName}
                        </div>
                        <div className="m-tips">
                          {
                            moment(data.ruleTime).format('YYYY-MM-DD HH:mm')
                          }
                        </div>
                      </div>

                      <div className="m-right">
                        {parseInt(data.point) > 0 ? '+' :''}{data.point}
                      </div>
                    </li>
                  )
                })
              }


            </ul>
          </ScrollView>
        </div>



      </div>
    )
  }

})
