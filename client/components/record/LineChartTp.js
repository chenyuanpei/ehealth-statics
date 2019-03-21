import React, {Component, PropTypes} from 'react'
import {calc} from '../../util/setFontSize'
// import ScrollView from '../common/scroll/ScrollView'
import {compareValue} from '../../util/compare'

let zrender
if (process.browser) {
  const shape = {}
  shape.CircleShape = require('zrender/shape/Circle')
  shape.RectangleShape = require('zrender/shape/Rectangle')
  shape.LineShape = require('zrender/shape/Line')
  shape.TextShape = require('zrender/shape/Text')

  zrender = {
    zrender: require('zrender'),
    shape,
  }
}

const zrStyle = {width: '100%', height: '100%'}

const noDataStyle = {
  position: 'absolute',
  left: 0,
  top: calc(97),
  width: '100%',
  textAlign: 'center',
  color: 'rgba(255,255,255,0.5)',
  fontSize: calc(28),
}

const zrValBoxStyle = {
  position: 'absolute',
  bottom: 0,
  top: 0
}
export default class LineChart extends Component {

  static propTyps = {
    values: PropTypes.arrayOf(PropTypes.shape({
      values: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired,
    yAxis: PropTypes.shape({
      defMax: PropTypes.number,
      defMin: PropTypes.number,
      minScale: PropTypes.number,
    }),
    initOffsetX: PropTypes.number,
    xAxis: PropTypes.shape({
      format: PropTypes.func,
      values: PropTypes.array,
    }),
    scroll: PropTypes.bool,
    noDataTip: PropTypes.string,
  }

  static defaultProps = {
    yAxis: {
      max: -Infinity,
      min: Infinity,
      defMax: 120,
      defMin: 60,
      minScale: 10
    },
    initOffsetX: 0,
    xAxis: {
      format: (v) => (v),
      values: []
    },
    values: [],
    scroll: false,
    noDataTip: '没有数据'
  }

  state = {
    showNoDataTip: undefined
  }

  componentDidMount() {
    this.zrValOffset = 10
    this.zrValSpan = 83
    const {xAxis} = this.props


    this.zrValPadding = ((546 + 2 * this.zrValOffset) - (this.zrValSpan * 6)) / 2 // 620-60-14

    const {zrenderBox, zrenderValues, zrenderValuesBox} = this.refs

    this.zrenderBoxWidth = zrenderBox.offsetWidth

    zrenderBox.style.height = this.calc(305) + 'px'

    this.zr = zrender.zrender.init(this.refs.zrender)

    zrenderValuesBox.style.left = this.calc(60 - this.zrValOffset) + 'px'
    zrenderValuesBox.style.right = this.calc(14 - this.zrValOffset) + 'px'

    zrenderValues.style.width = this.calcZrValWidth() + 'px'

    this.zrVal = zrender.zrender.init(zrenderValues)
    // this.zrValSel = zrender.init(this.refs.zrenderValueSelect)

    this.changeShowNoDataTip()

    this.renderChart(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.changeShowNoDataTip(nextProps)

    const {values, xAxis} = this.props
    const {values: nextValues, xAxis: nextXAxis} = nextProps
    if(nextXAxis.type && nextXAxis.type === 'week'){
      this.zrValSpan = 83
    }else if(nextXAxis.type === 'month'){
      if(nextXAxis.values.length === 30){
        this.zrValSpan = 16.6
      }else {
        this.zrValSpan = 16
      }
    }else if(nextXAxis.type === 'day'){
      this.zrValSpan = 20.5
    }
    if (values.length !== nextValues.length) {
      return this.renderChart(nextProps)
    }
    for (let i = 0; i < values.length; i++) {
      let item = values[i]
      let nextItem = nextValues[i]

      if (item.values.length !== nextItem.values.length) {
        return this.renderChart(nextProps)
      }

      for (let j = 0; j < item.values.length; j++) {
        if (item.values[j] !== nextItem.values[j]) {
          return this.renderChart(nextProps)
        }
      }
    }

    if (!compareValue(xAxis, nextXAxis)) {

      return this.renderChart(nextProps)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {noDataTip} = this.props
    const {noDataTip: nextNoDataTip} = nextProps
    const {showNoDataTip} = this.state
    const {showNoDataTip: nextShowNoDataTip} = nextState
    if (showNoDataTip !== nextShowNoDataTip || noDataTip !== nextNoDataTip) {
      // 当 是否显示没数据 或 显示没数据文本 发生改变才更新
      return true
    }
    return false
  }

  changeShowNoDataTip(props) {
    props = props || this.props
    const {values} = props

    this.setState({
      showNoDataTip: !values.some(v => v.values.some(v => v !== undefined))
    })
  }

  addShape(zr, Shape, options) {
    let shapeObj = new Shape({
      ...options,
      hoverable: false,
    })
    zr.addShape(shapeObj)
    return shapeObj
  }

  calcZrValWidth(props) {
    let max = 7

    const {values} = props || this.props
    // 求最大值和最小值
    values.forEach((obj) => {
      max = obj.values.length > max ? obj.values.length : max
    })

    // (546 + 2 * this.zrValOffset) = 2* this.zrValPadding + (this.zrValSpan * 6)     //620-60-14
    let width = ((max - 1) * this.zrValSpan) + (2 * this.zrValPadding)

    return this.calc(width)
  }

  calc(p) {
    return parseInt(this.zrenderBoxWidth / (620) * p)
  }

  // 图表
  renderChart(props) {
    const {zrenderValues, scrollView} = this.refs
    const {xAxis} = this.props
    zrenderValues.style.width = this.calcZrValWidth(props) + 'px'

    let xPosArea = 6
    if(xAxis.type === 'week'){
      xPosArea = 25
    }else if(xAxis.type === 'month'){
      xPosArea = 5
    }else if(xAxis.type === 'year'){
      xPosArea = 13
    }
    const render = () => {
      this.zrVal.resize()

      this.zr.clear()
      this.zrVal.clear()

      // y坐标
      this.renderCoordinate(props)

      // x坐标
      this.renderXAxis(props)

      // 值
      this.renderValues(props)

      this.renderValueSelected(props)

    }

    if (scrollView) {
      scrollView.update()
      // if (props.initOffsetX) {
      setTimeout(() => {
        const x = this.calc(props.initOffsetX * -this.zrValSpan)
        scrollView.swiper.setWrapperTranslate(x)

        render()
      }, 0)
      return
      // }
    }

    render()
  }

  // 画坐标
  renderCoordinate(props) {
    // 三条虚线对应的y轴坐标
    this.yList = [this.calc(70), this.calc(125), this.calc(180), this.calc(234)]

    this.calcCoordinate(props)

    let baseLineStyle = {
      strokeColor: '#FFF',
      lineWidth: 1,
      xStart: this.calc(20),
      xEnd: this.calc(606),
      opacity: 0.26,
      lineType: 'dashed',
      // dashLength:this.calc(2),
    }

    let baseTextStyle = {
      ...(this.genTextStyle(20)),
      x: this.calc(20),
      textBaseline: 'bottom',
      textAlign: 'left',
    }

    // 坐标线
    this.yList.forEach((y, i) => {
      this.addShape(this.zr, zrender.shape.LineShape, {
        style: {
          ...baseLineStyle,
          yStart: y,
          yEnd: y,
        }
      })

      this.addShape(this.zr, zrender.shape.TextShape, {
        style: {
          ...baseTextStyle,
          y: y - 4,
          text: this.cList[i]+'℃'
        }
      })
    })
  }

  // 获取文本样式
  genTextStyle(fontSize) {
    return {
      brushType: 'fill',
      color: '#FFFFFF',
      textFont: `normal ${this.calc(fontSize)}px verdana`,
      textAlign: 'left',
      textBaseline: 'top'
    }
  }

  // 计算坐标
  calcCoordinate(props) {


    this.cList = [39, 38, 37,36]
  }

  renderXAxis(props) {
    const {xAxis} = props || this.props
    if (!xAxis || !xAxis.values || xAxis.type !== 'week') {
      return
    }
    //显示下面的文字
    xAxis.values.forEach((value, i) => {
      this.addShape(this.zrVal, zrender.shape.TextShape, {
        style: {
          ...(this.genTextStyle(20)),
          textBaseline: 'middle',
          textAlign: 'center',
          display:'none',
          x: this.calcX(i),
          y: this.yList[2] + this.calc(38),
          text: xAxis.format ? xAxis.format(value) : value
        }
      })
    })
  }

  // 画值
  renderValues(props) {
    const {values} = props || this.props

    this.valuesPos = []

    let lastIndex
    values.forEach((obj, mindex) => {
      const list = []

      obj.values.forEach((v, i) => {

        if (!v) {
          return
        }
        const item = {
          i: i,
          x: this.calcX(i),
          y: this.calcY(v),
          v: v,
        }

        list.push(item)

        this.renderValueLine(list)
        this.renderValueRound(item)



        this.renderValueArea(item)

        if (!this.valuesPos[i]) {
          this.valuesPos[i] = []
        }

        this.valuesPos[i].push(item)

        lastIndex = i
      })
    })

    if (lastIndex) {
      this.selectedIndex = lastIndex
    }
  }

  calcX(i) {
    return this.calc(i * this.zrValSpan + this.zrValPadding)
  }

  // 值的圆点
  renderValueCircle({x, y}) {
    this.addShape(this.zrVal, zrender.shape.CircleShape, {
      style: {
        r: this.calc(4),
        x: x,
        y: y,
        lineWidth: 1,
        color: '#fff',
        strokeColor: '#fff',
        //brushType: 'stroke',
        brushType: 'both',
      }

    })
  }
  // 值的空心点
  renderValueRound({x, y, v}) {
    this.addShape(this.zrVal, zrender.shape.CircleShape, {
      style: {
        r: this.calc(4),
        x: x,
        y: y,
        lineWidth: 1,
        color: this.getValueColor(v),
        strokeColor: this.getValueColor(v),
        //brushType: 'stroke',
        brushType: 'both',
      }
    })
  }
  // 点的颜色
  getValueColor(y){
    let roundColor = '#fff'
    if(y < 36){
      roundColor = '#7422f4'
    }else if(y > 37 ){
      roundColor = '#e07774'
    }
    return roundColor
  }
  // 值的线
  renderValueLine(list) {
    const [p1, p2] = list

    if (!p1 || !p2) {
      return
    }
    let angle = Math.atan((p2.y-p1.y)/(p2.x-p1.x))
    let cx = Math.cos(angle)*2
    let cy = Math.sin(angle)*2
    this.addShape(this.zrVal, zrender.shape.LineShape, {
      style: {
        lineType: p2.i - p1.i === 1 ? 'solid' : 'dotted',
        strokeColor: '#FFF',
        lineWidth: 2,
        opacity: p2.i - p1.i === 1 ? 0.7 : 0.4,
        xStart: p1.x + cx,
        xEnd: p2.x,
        yStart: p1.y+cy,
        yEnd: p2.y,
      }
    })

    list.shift()
  }

  renderValueArea({x, y, i}) {
    let halfWidth = this.calc(30)
    const {scroll} = this.props

    this.addShape(this.zrVal, zrender.shape.RectangleShape, {
      index: i,
      style: {
        // color: '#FFF',
        opacity: 0,
        x: x - halfWidth,
        y: 0,
        width: halfWidth * 2,
        height: this.zrVal.getHeight() - this.calc(70),
      },
      clickable: scroll,
      onclick: (params) => {
        // this.showValue(params.target.index)
      },
      // onmousedown: (params) => {
      //   this.showValue(params.target.index)
      // },
      // onmouseover: (params) => {
      //   this.showValue(params.target.index)
      // },
      // touchstart: (params) => {
      //
      //   this.showValue(params.target.index)
      // },
      // touchmove: (params) => {
      //
      //   this.showValue(params.target.index)
      // },
      // touchend: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },
      // onmouseout: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },
      // onmouseup: (params) => {
      //
      //   if (this._valShowValuesShape) {
      //     this.zrVal.delShape(this._valShowValuesShape.id)
      //   }
      //   if (this._valShowValueLine) {
      //
      //     this.zrVal.delShape(this._valShowValueLine.id)
      //   }
      // },

    })
  }

  renderValueSelected(props) {
    if (this.selectedIndex === undefined) {
      return
    }

    const pos = this.valuesPos[this.selectedIndex]

    if (this._valSelectedShapes) {
      this._valSelectedShapes.forEach(shapes => {
        shapes.forEach((shape, i) => {
          this.zrVal.delShape(shape.id)
        })
      })
    }

    this._valSelectedShapes = []

    if (!pos) {
      return
    }

    pos.forEach(({x, y, v}, i) => {
      const baseStyle = {
        x,
        y,
        lineWidth: 1,
        color: this.getValueColor(v),
        // brushType: 'stroke',
        brushType: 'fill',
      }

      const shapes = [
        this.addShape(this.zrVal, zrender.shape.CircleShape, {
          style: {
            ...baseStyle,
            r: this.calc(10),
            opacity: 0.36,
          }
        }),
        this.addShape(this.zrVal, zrender.shape.CircleShape, {
          style: {
            ...baseStyle,
            r: this.calc(15),
            opacity: 0.18,
          }
        })
      ]

      this._valSelectedShapes[i] = shapes
    })
  }

  calcP({x: x1, y: y1}, {x: x2, y: y2}, r) {
    // console.log('x1=' + x1)
    // console.log('y1=' + y1)
    // console.log('x2=' + x2)
    // console.log('y1=' + y2)
    // console.log('r=' + r)
    let p1 = {
      m: r * Math.abs(x2 - x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + x1,
      n: r * Math.abs(y2 - y1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + y1
    }
    return [p1, {
      m: x1 + x2 - p1.m,
      n: y1 + y2 - p1.n
    }]
  }

  calcY(value) {
    const temp = (this.yList[0] - this.yList[2]) / (this.cList[0] - this.cList[2])
    return (value - this.cList[0]) * temp + this.calc(70)
  }

  selectValue(index) {
    if (index === this.selectedIndex) {
      return
    }
    this.selectedIndex = index

    this.renderValueSelected()
  }
  showValue(index){

    this.selectedIndex = index

    this.renderShowValue()
  }
  renderShowValue(props){
    let {values,moreInfo} = props || this.props
    if(moreInfo){
      return
    }
    if (this.selectedIndex === undefined) {
      return
    }

    const pos = this.valuesPos[this.selectedIndex]

    if (this._valShowValuesShape) {

      this.zrVal.delShape(this._valShowValuesShape.id)
    }
    if (this._valShowValueLine) {

      this.zrVal.delShape(this._valShowValueLine.id)
    }

    this._valShowValuesShape = null
    this._valShowValueLine = null

    if (!pos) {
      return
    }
    const canvasWidth = this.calcZrValWidth(props)
    let xPosition = this.calcX(this.selectedIndex) - 25
    if(this.calcX(this.selectedIndex) - 25 < 0){
      xPosition = 0
    }else if(this.calcX(this.selectedIndex) + 25 > canvasWidth){
      xPosition = canvasWidth - 60
    }
    const shapes = this.addShape(this.zrVal, zrender.shape.RectangleShape, {
          style: {
            width : 50,
            textColor:'#3abbd5',
            color:'#fff',
            height : 16,
            textFont:'normal 12px verdana',
            background: '#fff',
            textPosition:'inside',
            radius: [2,2,2,2],
            x: xPosition,
            y: this.calc(18),
            text: values[0].values[this.selectedIndex] + '/' + values[1].values[this.selectedIndex]
          }
        })
    const shapesLine = this.addShape(this.zrVal, zrender.shape.LineShape, {
          style: {
            lineType:'dotted',
            strokeColor: '#FFF',
            lineWidth: 2,
            opacity: 0.7,
            xStart: this.calcX(this.selectedIndex),
            xEnd: this.calcX(this.selectedIndex),
            yStart: pos[0].y,
            yEnd: this.calc(36),
          }
        })


      this._valShowValuesShape = shapes
      this._valShowValueLine = shapesLine

  }
  render() {
    const {scroll, className, noDataTip} = this.props
    const {showNoDataTip} = this.state



    return (
      <div className={className} ref="zrenderBox" style={{...zrStyle, position: 'relative'}}>
        <div style={zrStyle} ref="zrender"></div>
        <div ref="zrenderValuesBox" style={zrValBoxStyle}>
          <div style={zrStyle} ref="zrenderValues"></div>
        </div>
        <div style={{...noDataStyle, display: showNoDataTip ? 'block' : 'none'}}>
          {noDataTip}
        </div>
      </div>
    )
  }
}
