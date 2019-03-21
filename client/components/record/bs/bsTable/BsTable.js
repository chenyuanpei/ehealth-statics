import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import PubSub from 'pubsub-js'
import {TOPIC_BS_DETAIL_CLICK} from '../../topic'
export default class BsTable extends Component {

  handleBsTdClick(id) {
    PubSub.publish(TOPIC_BS_DETAIL_CLICK, id)
  }
  render() {
    const {bsData,memberId} = this.props

    // 有血压数据记录
    return (
      <div>
        <table cellPadding="0" cellSpacing="0" width={`100%`}>

          {bsData.map(
            (values, idx) => {
              // 判断跟前面是否同一天，若同一天则隐藏
              let display = 'show'
              if (idx !== 0 && moment(bsData[idx-1][0].measurementDate).isSame(values[0].measurementDate, 'month')) {
                display = 'hide'
              }
              return(
                <tbody>
                  <tr className={`m-table-date-${display}`}>
                    <td colSpan="8">{moment(values[0].measurementDate).format('YYYY年MM月')}</td>
                  </tr>
                  <tr>
                    <th>{moment(values[0].measurementDate).format('MM')}/{moment(values[0].measurementDate).format('DD')}</th>
                    {values && values.map(
                      (value, index) => {
                        let memoClass = ''
                        if(value.memo && value.memo !==''){
                          memoClass = 'm-memo-td-class'
                        }
                        return(
                          <td onClick={() => {
                            value.id && this.handleBsTdClick(value.id)
                          }}
                              className={`record-${value.level} ${memoClass}`}>{value.glucoseConcentration && value.glucoseConcentration.toFixed(1)}</td>
                        )

                      }
                    )}
                  </tr>
                </tbody>
              )

            }
          )}

        </table>
      </div>
    )
  }
}
