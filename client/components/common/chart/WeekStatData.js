import React, {Component, PropTypes} from 'react'

const containerStyleUp = {
  width: '33%',
  height: '100%',
  float: 'left',
  textAlign: 'center',
  fontSize: '24px'
}

const containerStyleDown = {
  width: '33%',
  height: '100%',
  float: 'left',
  textAlign: 'center',
  fontSize: 'xx-small'
}

const fontStyle = {
  fontSize: 'xx-small'
}

export default class WeekStatData extends Component {

  static propTypes = {
    weekData: PropTypes.object,
  }

  render() {
    const {weekData} = this.props

    return (
      <div>
        <div>
          <div style={containerStyleUp}>{weekData.weekCount}<label style={fontStyle}>次</label></div>
          <div style={containerStyleUp}>{weekData.normalCount}<label style={fontStyle}>次</label></div>
          <div style={containerStyleUp}>{weekData.abnormalCount}<label style={fontStyle}>次</label></div>
        </div>
        <div>
          <div style={containerStyleDown}>本周测量</div>
          <div style={containerStyleDown}>正常</div>
          <div style={containerStyleDown}>异常</div>
        </div>
      </div>
    )
  }
}
