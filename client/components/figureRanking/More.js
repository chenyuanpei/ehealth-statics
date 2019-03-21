import React, {Component, PropTypes} from 'react'
import Mask from 'react-weui/lib/components/mask'

export default class More extends Component {
  static propTypes = {
    recordsLoading:PropTypes.bool,
    showMore:PropTypes.bool,
  }

  static defaultProps = {
    recordsLoading:false,
    showMore:false,
  }


  componentDidMount(){

  }


  render() {
    const {recordsLoading,showMore} = this.props
    require('../../styles/figureRanking/more.styl')

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
