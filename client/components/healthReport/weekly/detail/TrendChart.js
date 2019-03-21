import React, {Component, PropTypes} from 'react'
import {calc} from '../../../../util/setFontSize'
import {calcCoordinates, generatePath} from '../../../../util/chart'

let zrender
if (process.browser) {
  zrender = {
    zrender: require('zrender'),
    shape: {
      Circle: require('zrender/shape/Circle'),
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
    values: PropTypes.object,
  }

  static defaultProps = {
    // values: {
    //   sp: [1, 2, 3, 4, 5, 6, 7],
    //   dp: [1, 2, 3, 4, 5, 6, 7],
    // }
  }

  width = 620
  height = 420
  paddingLeft = 72
  paddingRight = 50
  paddingTop = 40
  paddingBottom = 130

  outBorderZLevel = 3
  brokenLine = 2

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
    if (Shape) {
      let shapeObj = new Shape({
        ...options,
        hoverable: false,
      })
      zr.addShape(shapeObj)
      return shapeObj
    }
    return zr.addShape(options)
  }

  invalidValues(props) {
    const {values} = props
    if (!values) {
      return true
    }
    const {sp, dp} = values
    return !sp || !dp || !sp.length || !dp.length
  }

  renderChart(props) {
    if (this.invalidValues(props)) {
      return
    }

    this.setYCoordinates(props)
    this.setXCoordinates(props)

    this.renderAxis(props)

    this.renderValues(props)
  }

  // 设置y坐标
  setYCoordinates(props) {
    const {values: {sp, dp}} = props

    // const max = Math.max(...[...sp, ...dp])
    this.yCoordinates = calcCoordinates(
      // [0, max],  // 固定最小值为0
      [...sp, ...dp],
      {
        min: 0,
        count: 6,
        step: 5,
        minStep: 10
      }
    )
  }

  // 设置x坐标
  setXCoordinates(props) {
    this.xCoordinates = [...new Array(7)].map((val, index) => {
      return this.calc((this.width - this.paddingLeft - this.paddingRight) * index / 6 + this.paddingLeft)
    })
  }

  calcY(value) {
    const {min, max} = this.yCoordinates
    return this.calc((this.height - this.paddingTop - this.paddingBottom) * ((max - value) / (max - min)) + this.paddingTop)
  }

  calcX(index) {
    return this.xCoordinates[index]
  }

  // 坐标轴、网格线、y轴坐标、x周坐标
  renderAxis(props) {
    const {arr: yAxisList} = this.yCoordinates
    const {values: {date}} = props

    // 公共样式
    const lineStyle = {
      strokeColor: '#c1c1c1',
      lineWidth: this.calc(2),
    }

    // 水平线样式
    const horizontalStyle = {
      ...lineStyle,
      xStart: this.calc(this.paddingLeft),
      xEnd: this.calc(this.width - this.paddingRight),
    }

    // y轴 坐标值文本的 x
    const yTextX = this.calc(this.paddingLeft - 10)
    yAxisList.forEach((val, index) => {
      const y = this.calcY(val)

      // y轴 坐标值(最大值不显示)
      if (index < 5) {
        this.addShape(this.zr, zrender.shape.Text, {
          style: {
            textFont: `${this.calc(20)}px verdana`,
            color: '#222222',
            x: yTextX,
            y,
            textBaseline: 'middle',
            textAlign: 'end',
            text: `${val}`
          }
        })
      }

      // 水平网格线
      if (index > 0 && index < 5) {
        this.addShape(this.zr, zrender.shape.Line, {
          style: {
            ...horizontalStyle,
            lineWidth: this.calc(1),
            yStart: y,
            yEnd: y,
          }
        })
      }
      // x轴
      if (index === 0) {
        this.addShape(this.zr, zrender.shape.Line, {
          zlevel: this.outBorderZLevel,
          style: {
            ...horizontalStyle,
            yStart: y,
            yEnd: y,
          }
        })
      }
    })

    // 垂直线样式
    const verticalStyle = {
      ...lineStyle,
      yStart: this.calc(this.paddingTop),
      yEnd: this.calc(this.height - this.paddingBottom),
    }

    // x轴 坐标值
    const dateY = this.calc(this.height - this.paddingBottom + 20)
    date.forEach((val, index) => {
      const x = this.calcX(index)
      this.addShape(this.zr, zrender.shape.Text, {
        style: {
          textFont: `${this.calc(20)}px verdana`,
          color: '#b8bec7',
          x,
          y: dateY,
          textBaseline: 'top',
          textAlign: 'center',
          text: `${val}`
        }
      })

      // 左边y轴
      if (index === 0) {
        this.addShape(this.zr, zrender.shape.Line, {
          zlevel: this.outBorderZLevel,
          style: {
            ...verticalStyle,
            xStart: x,
            xEnd: x,
          }
        })
      } else if (index === 6) {
        // 右边y轴
        this.addShape(this.zr, zrender.shape.Line, {
          zlevel: this.outBorderZLevel,
          style: {
            ...verticalStyle,
            lineWidth: this.calc(1),
            xStart: x,
            xEnd: x,
          }
        })
      } else {
        // 网格虚线
        this.addShape(this.zr, zrender.shape.Line, {
          style: {
            ...verticalStyle,
            lineWidth: this.calc(1),
            lineType: 'dashed',
            xStart: x,
            xEnd: x,
          }
        })
      }
    })
  }

  // 数据折线
  renderValues(props) {
    const {values: {sp: spArr}} = props

    if (spArr.filter(v => v).length > 1) {
      this.renderValuesForMultiple(props)
    } else {
      this.renderValuesForSingle(props)
    }

    this.renderValuesText(props)
  }

  renderValuesForMultiple(props) {
    const {values: {sp: spArr, dp: dpArr}} = props

    // 高压的坐标集合
    const spXyList = this.generateXy(spArr)
    // 低压的坐标集合
    const dpXyList = this.generateXy(dpArr)

    // 折线公共样式
    const lineStyle = {
      lineWidth: this.calc(2),
      brushType: 'stroke',
      x: 0,
      y: 0
    }

    // 高压折线
    this.addShape(this.zr, zrender.shape.Path, {
      zlevel: this.brokenLine,
      style: {
        ...lineStyle,
        strokeColor: '#52c1ff',
        path: generatePath(spXyList),
      }
    })

    // 低压
    this.addShape(this.zr, zrender.shape.Path, {
      zlevel: this.brokenLine,
      style: {
        ...lineStyle,
        strokeColor: '#00b9a5',
        path: generatePath(dpXyList),
      }
    })

    // 渐变背景 公共样式
    const bgStyle = {
      x: 0,
      y: 0
    }

    // 高压渐变背景
    const spBgXyList = [...spXyList, ...[...dpXyList].reverse()]
    const spBgYList = spBgXyList.map(([x, y]) => y)
    const spBgColorMinY = Math.min(...spBgYList)
    const spBgColorMaxY = Math.max(...spBgYList)
    this.addShape(this.zr, zrender.shape.Path, {
      style: {
        ...bgStyle,
        color: zrender.tool.color.getLinearGradient(
          0, spBgColorMinY, 0, spBgColorMaxY + (spBgColorMaxY - spBgColorMinY) * 0.5,
          [[0, '#b0e3ff'], [1, 'rgba(255,255,255,0)']]
        ),
        path: generatePath(spBgXyList, {closepath: true}),
      }
    })
    // 低压渐变背景
    const dpBgXList = dpXyList.map(([x, y]) => x)
    const dpBgMaxX = Math.max(...dpBgXList) // 最大x
    const dpBgMinX = Math.min(...dpBgXList) // 最小x
    const dpBgMinY = this.calc(this.height - this.paddingBottom) // 最小y
    const dpBgXyList = [...dpXyList, [dpBgMaxX, dpBgMinY], [dpBgMinX, dpBgMinY]] // 所有 xy
    const dpBgYList = dpBgXyList.map(([x, y]) => y) // 所有y
    const dpBgColorMaxY = Math.max(...dpBgYList)
    const dpBgColorMinY = Math.min(...dpBgYList)
    this.addShape(this.zr, zrender.shape.Path, {
      style: {
        ...bgStyle,
        color: zrender.tool.color.getLinearGradient(
          0, dpBgColorMinY, 0, dpBgColorMaxY + (dpBgColorMaxY - dpBgColorMinY) * 0.5,
          [[0, '#6defdf'], [1, 'rgba(255,255,255,0)']]
        ),
        path: generatePath(dpBgXyList, {closepath: true}),
      }
    })
  }

  renderValuesForSingle(props) {
    const {values: {sp: spArr, dp: dpArr}} = props

    // 高压的坐标集合
    const spXyList = this.generateXy(spArr)
    // 低压的坐标集合
    const dpXyList = this.generateXy(dpArr)

    const baseStyle = {
      r: this.calc(8),
    }

    // 高压
    spXyList.forEach(([x, y]) => {
      this.addShape(this.zr, zrender.shape.Circle, {
        style: {
          ...baseStyle,
          x,
          y,
          color: '#52c1ff',
        }
      })
    })

    // 低压
    dpXyList.forEach(([x, y]) => {
      this.addShape(this.zr, zrender.shape.Circle, {
        style: {
          ...baseStyle,
          x,
          y,
          color: '#00b9a5',
        }
      })
    })
  }

  generateXy(values) {
    return values.map((val, index) => {
      if (!val) {
        return
      }
      return [
        this.calcX(index),
        this.calcY(val),
      ]
    }).filter(val => val)
  }

  renderValuesText(props) {
    const {values: {sp: spArr, dp: dpArr}} = props

    const spY = this.calc(this.height - this.paddingBottom + 76)
    const dpY = this.calc(this.height - this.paddingBottom + 110)

    const baseStyle = {
      textFont: `${this.calc(20)}px verdana`,
      textBaseline: 'middle',
      textAlign: 'center',
    }

    const titleStyle = {
      ...baseStyle,
      x: this.calc(this.paddingLeft - 10),
      textAlign: 'end',
      color: '#222222',
    }

    // 高压 标题
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...titleStyle,
        y: spY,
        text: '高压'
      }
    })
    // 低压 标题
    this.addShape(this.zr, zrender.shape.Text, {
      style: {
        ...titleStyle,
        y: dpY,
        text: '低压'
      }
    })

    spArr.forEach((sp, index) => {
      if (!sp) {
        return
      }
      const dp = dpArr[index]

      baseStyle.x = this.calcX(index) + (index === 0 ? this.calc(20) : 0)

      // 高压
      this.addShape(this.zr, zrender.shape.Text, {
        style: {
          ...baseStyle,
          color: '#77d418',
          y: spY,
          text: sp
        }
      })

      // 低压
      this.addShape(this.zr, zrender.shape.Text, {
        style: {
          ...baseStyle,
          color: '#52c1ff',
          y: dpY,
          text: dp
        }
      })
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
