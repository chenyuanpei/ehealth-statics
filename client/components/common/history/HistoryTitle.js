import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {getUpdateDateDesc,checkFloat} from '../../../util/common'
import {weightDataFormat} from '../../../util/weight/weight'

export default class HistoryTitle extends Component {
  static propTypes = {
    date: PropTypes.string,
    value:PropTypes.string
  }

  static defaultProps = {
    date: '',
    value:'',
  }

  componentDidMount(){
  }

  render() {
    const {date,value} = this.props
    require('../../../styles/common/history/history.styl')


    return (
      <div className="week-div">
        <div className="week-text">{date}</div>
        <div className="week-value">{value}</div>
      </div>
    )
  }





}
