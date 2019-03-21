import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {getUpdateDateDesc,checkFloat} from '../../../util/common'
import {weightDataFormat} from '../../../util/weight/weight'

export default class HistoryItem extends Component {
  static propTypes = {
    date: PropTypes.string,
    //value:PropTypes.string,
    show:PropTypes.bool,
  }

  static defaultProps = {
    date: '',
    value:'',
    show:true
  }

  componentDidMount(){
  }

  render() {
    const {date,pbfValue,value,show,onClick} = this.props
    require('../../../styles/common/history/history.styl')


    return (
      <a onClick={onClick}  className={show?'history-item':'history-item border-none'}>
        <div className="history-time">{date}</div>
        <div className="history-value">
          <span className="m-weight-value">{value} </span>
          {!!pbfValue && <span className="m-weight-pbf">{pbfValue.toFixed(1)}%</span>}
          <span className="icon-arrow-lr"></span>
        </div>
      </a>
    )
  }





}
