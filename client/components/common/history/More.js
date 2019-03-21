import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'
import {getUpdateDateDesc,checkFloat} from '../../../util/common'
import {weightDataFormat} from '../../../util/weight/weight'

export default class More extends Component {
  static propTypes = {
    recordsLoading:PropTypes.bool,
    noMoreBatch:PropTypes.bool,
    showMore:PropTypes.bool,
  }

  static defaultProps = {
    recordsLoading:false,
    //noMoreBatch:false,
    showMore:false,
  }


  componentDidMount(){

  }


  render() {
    const {recordsLoading,noMoreBatch,showMore} = this.props
    require('../../../styles/common/history/history.styl')

    return (
      <div>
        <div style={{display: recordsLoading?'block':'none'}} className="loading-box">
          <div className="icon-loading">
          </div>
          正在加载更多数据...
        </div>
        <div style={{display: showMore?'flex':'none'}} className="loading-box">
          暂无更多数据
        </div>
      </div>
    )
  }
}
