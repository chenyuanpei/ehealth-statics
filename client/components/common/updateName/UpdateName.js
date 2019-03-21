import React, {Component, PropTypes} from 'react'
import {calc} from '../../../util/setFontSize'

const backgroundStyle = {
  backgroundColor: 'white',
  height: calc(150),
  marginTop: calc(2)
}

const leftStyle = {
  float: 'left',
  width: '25%',
  height: calc(150),
}

const leftStyleImg = {
  paddingTop: calc(22),
  paddingLeft: calc(42),
  width: calc(100),
  height: calc(100),
}

const centerStyle = {
  float: 'left',
  width: '60%',
  fontSize: calc(36),
  lineHeight: calc(150)
}

const rightStyle = {
  float: 'left',
  width: '10%',
  height: calc(150),
}

const rightStyleImg = {
  paddingTop: calc(55),
  width: calc(35),
  height: calc(35),
}

export default class UpdateName extends Component {
  static propTypes = {
    lastData: PropTypes.object,
  }

  render() {
    const {lastData} = this.props
    return (
      <div style={backgroundStyle}>
        <div style={leftStyle}>
          <img style={leftStyleImg} src={lastData.familyImg}/>
        </div>
        <div style={centerStyle}>
          {lastData.name}
        </div>
        <div style={rightStyle}>
          <img style={rightStyleImg} src={lastData.updateImg}/>
        </div>
      </div>
    )
  }
}
