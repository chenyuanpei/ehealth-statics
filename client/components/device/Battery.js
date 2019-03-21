import React, {Component, PropTypes} from 'react'

export default class Battery extends Component {

  static propTypes = {
    percent: PropTypes.number
  }

  render() {
    require('../../styles/battery/battery.less')

    const {level} = this.props

    const aBattery = require('../../../static/images/battery/icon_cell_a.png')
    const bBattery = require('../../../static/images/battery/icon_cell_b.png')
    const cBattery = require('../../../static/images/battery/icon_cell_c.png')
    const dBattery = require('../../../static/images/battery/icon_cell_d.png')
    const eBattery = require('../../../static/images/battery/icon_cell_e.png')
    const fBattery = require('../../../static/images/battery/icon_cell_f.png')
    const gBattery = require('../../../static/images/battery/icon_cell_g.png')
    const hBattery = require('../../../static/images/battery/icon_cell_h.png')
    var imgsrc = aBattery

    switch (level) {
      case 0:
        imgsrc = hBattery
        break
      case 1:
        imgsrc = gBattery
        break
      case 2:
        imgsrc = fBattery
        break
      case 3:
        imgsrc = eBattery
        break
      case 4:
        imgsrc = dBattery
        break
      case 5:
        imgsrc = cBattery
        break
      case 6:
        imgsrc = bBattery
        break
      case 7:
        imgsrc = aBattery
        break
    }

    return (
        <img src={imgsrc} className="battery"/>
    )
  }
}
