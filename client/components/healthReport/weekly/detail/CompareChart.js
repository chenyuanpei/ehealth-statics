import React, {Component, PropTypes} from 'react'
import {calc} from '../../../../util/setFontSize'
import {calcCoordinates, generatePath} from '../../../../util/chart'

let zrender
if (process.browser) {
  zrender = {
    zrender: require('zrender'),
    shape: {
      Line: require('zrender/shape/Line'),
      Text: require('zrender/shape/Text'),
      Path: require('zrender/shape/Path'),
    },
    tool: {
      color: require('zrender/tool/color')
    }
  }
}

export default class extends Component {

  static propTypes = {
    values: PropTypes.array,
  }

  static defaultProps = {
    // values: [{sp: 204, dp: 95}, {sp: 114, dp: 55}]
  }

  width = 620
  height = 250
  paddingLeft = 50
  paddingRight = 50
  paddingTop = 30
  paddingBottom = 50
  x1 = this.paddingLeft + 140
  x2 = this.width - this.paddingRight - 90

  componentDidMount() {
    const {zrender: zrenderEl} = this.refs

    this.offsetWidth = zrenderEl.offsetWidth
    this.zr = zrender.zrender.init(zrenderEl)

    this.renderChart(this.props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.renderChart(nextProps)
    return false
  }

  // 计算相对位置
  calc(p) {
    return this.offsetWidth / (this.width) * p
  }

  // 添加形状（渲染到画布上）
  addShape(zr, Shape, options) {
    let shapeObj = new Shape({
      ...options,
      hoverable: false,
    })
    zr.addShape(shapeObj)
    return shapeObj
  }

  invalidValues(props) {
    const {values} = props
    const [{sp, dp}, {sp: lastSp, dp: lastDp}] = values
    return sp === undefined || dp === undefined || lastSp === undefined || lastDp === undefined
  }

  renderChart(props) {
    if (this.invalidValues(props)) {
      return
    }
    this.setYCoordinates(props)

    this.renderLine(props)

    this.renderAxis(props)

    this.renderText(props)

    this.renderDpLine(props)
  }

  // 设置y坐标
  setYCoordinates(props) {
    const {values} = props

    let allValues = []
    values.forEach(({sp, dp}) => {
      allValues = [...allValues, sp, dp]
    })
    // let max = Math.max(...allValues)
    // let min = Math.min(...allValues)
    this.yCoordinates = calcCoordinates(
      allValues,
      {
        count: 5,
        step: 5,
        minStep: 10
        // minStep: max - min
      }
    )
    // console.log(this.yCoordinates)
  }

  calcY(value) {
    const {min, max, step} = this.yCoordinates
    return this.calc((this.height - this.paddingTop - this.paddingBottom) * ((max - value) / ((min <= 0 ? max : max - min + step))) + this.paddingTop)
  }

  renderAxis(props) {
    const {values} = props

    const [{sp}, {sp: lastSp}] = values

    const baseStyle = {
      strokeColor: '#c1c1c1',
      lineWidth: this.calc(2),
      yEnd: this.calc(this.height - this.paddingBottom),
    }

    // x轴
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        ...baseStyle,
        xStart: this.calc(this.paddingLeft),
        xEnd: this.calc(this.width - this.paddingRight),
        yStart: this.calc(this.height - this.paddingBottom),
      }
    })

    // 左边y轴
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        ...baseStyle,
        xStart: this.calc(this.x1),
        xEnd: this.calc(this.x1),
        yStart: this.calcY(lastSp) - this.calc(30),
      }
    })

    // 右边y轴
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        ...baseStyle,
        xStart: this.calc(this.x2),
        xEnd: this.calc(this.x2),
        yStart: this.calcY(sp) - this.calc(30),
      }
    })
  }

  renderLine(props) {
    const {values} = props

    const [{sp, dp}, {sp: lastSp, dp: lastDp}] = values

    const xList = [this.x1, this.x2].map(x => this.calc(x))
    const spXyList = [lastSp, sp].map((val, index) => [xList[index], this.calcY(val)])
    const dpXyList = [lastDp, dp].map((val, index) => [xList[index], this.calcY(val)])

    // 高压渐变背景
    const spBgXyList = [...spXyList, ...[...dpXyList].reverse()]
    const spBgYList = spBgXyList.map(([x, y]) => y)
    const spBgColorMinY = Math.min(...spBgYList)
    const spBgColorMaxY = Math.max(...spBgYList)
    this.addShape(this.zr, zrender.shape.Path, {
      style: {
        color: zrender.tool.color.getLinearGradient(
          0, spBgColorMinY, 0, spBgColorMaxY + (spBgColorMaxY - spBgColorMinY) * 0.5,
          [[0, '#b0e3ff'], [1, 'rgba(255,255,255,0)']]
        ),
        x: 0,
        y: 0,
        path: generatePath(spBgXyList, {closepath: true}),
      }
    })
    // 低压渐变背景
    const dpBgMinY = this.calc(this.height - this.paddingBottom) // 最小y
    const dpBgXyList = [...dpXyList, [xList[1], dpBgMinY], [xList[0], dpBgMinY]] // 所有 xy
    const dpBgYList = dpBgXyList.map(([x, y]) => y) // 所有y
    const dpBgColorMaxY = Math.max(...dpBgYList)
    const dpBgColorMinY = Math.min(...dpBgYList)
    this.addShape(this.zr, zrender.shape.Path, {
      style: {
        color: zrender.tool.color.getLinearGradient(
          0, dpBgColorMinY, 0, dpBgColorMaxY + (dpBgColorMaxY - dpBgColorMinY) * 0.5,
          [[0, '#6defdf'], [1, 'rgba(255,255,255,0)']]
        ),
        x: 0,
        y: 0,
        path: generatePath(dpBgXyList, {closepath: true}),
      }
    })

    const lineStyle = {
      lineWidth: this.calc(2),
      xStart: this.calc(this.x1),
      xEnd: this.calc(this.x2),
    }
    // 高压
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        ...lineStyle,
        strokeColor: '#52c1ff',
        yStart: this.calcY(lastSp),
        yEnd: this.calcY(sp),
      }
    })

    // 低压
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        ...lineStyle,
        strokeColor: '#00b9a5',
        yStart: this.calcY(lastDp),
        yEnd: this.calcY(dp),
      }
    })
  }

  renderText(props) {
    const {values} = props

    const [{sp, dp}, {sp: lastSp, dp: lastDp}] = values

    const baseStyle = {
      textFont: `${this.calc(22)}px verdana`,
      color: '#222222',
    }

    const leftX = this.calc(30)
    // 上周高压
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        x: leftX,
        y: this.calcY(lastSp),
        textBaseline: lastDp === 0 ? 'bottom' : 'middle',
        textAlign: 'start',
        text: `高压平均 ${lastSp}`
      }
    })
    // 上周低压
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        x: leftX,
        y: this.calcY(lastDp),
        textBaseline: 'top',
        textAlign: 'start',
        text: `低压平均 ${lastDp}`
      }
    })

    const rightX = this.calc(this.x2 + 30)
    // 本周高压
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        x: rightX,
        y: this.calcY(sp),
        textAlign: 'start',
        text: sp + ''
      }
    })
    // 本周低压
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        x: rightX,
        y: this.calcY(dp),
        textAlign: 'start',
        text: dp + ''
      }
    })

    // X轴下方 上周
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        color: '#b8b2c7',
        x: this.calc(this.x1 - 5),
        y: this.calc(this.height - this.paddingBottom + 20),
        textAlign: 'end',
        text: '上周'
      }
    })
    // X轴下方 本周
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...baseStyle,
        color: '#b8b2c7',
        x: this.calc(this.x2 - 5),
        y: this.calc(this.height - this.paddingBottom + 20),
        textAlign: 'end',
        text: '本周'
      }
    })
  }

  renderDpLine(props) {
    const {values} = props

    const {dp: lastDp} = values[1]

    if (lastDp === 0) {
      return
    }
    // 上周低压平均线
    this.addShape(this.zr, zrender.shape.Line, {
      style: {
        strokeColor: '#c1c1c1',
        lineType: 'dashed',
        lineWidth: this.calc(2),
        xStart: this.calc(this.paddingLeft),
        xEnd: this.calc(this.width - this.paddingRight),
        yStart: this.calcY(lastDp),
        yEnd: this.calcY(lastDp),
      }
    })
  }

  render() {
    const zrenderBoxStyle = {position: 'relative', width: '100%', height: calc(this.height)}
    const zrenderStyle = {width: '100%', height: '100%'}
    return (
      <div ref="zrenderBox" style={zrenderBoxStyle}>
        <div style={zrenderStyle} ref="zrender"></div>
      </div>
    )
  }
}
